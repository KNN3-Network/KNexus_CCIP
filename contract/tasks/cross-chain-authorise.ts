import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import {
  getPayFeesIn,
  getPrivateKey,
  getProviderRpcUrl,
  getRouterConfig,
} from "./utils";
import { BigNumber, Wallet, providers } from "ethers";
import {
  KnexusItemSourceMinter,
  KnexusItemSourceMinter__factory,
} from "../typechain-types";
import { Spinner } from "../utils/spinner";
import { getCcipMessageId } from "./helpers";

task(
  `cross-chain-authorise`,
  `Mints the new NFT by sending the Cross-Chain Message`
)
  .addParam(
    `sourceBlockchain`,
    `The name of the source blockchain (for example ethereumSepolia)`
  )
  .addParam(
    `sourceMinter`,
    `The address of the SourceMinter.sol smart contract on the source blockchain`
  )
  .addParam(
    `destinationBlockchain`,
    `The name of the destination blockchain (for example polygonMumbai)`
  )
  .addParam(
    `destinationMinter`,
    `The address of the DestinationMinter.sol smart contract on the destination blockchain`
  )
  .addParam(`payFeesIn`, `Choose between 'Native' and 'LINK'`)
  .setAction(async (taskArguments: TaskArguments) => {
    const {
      sourceBlockchain,
      sourceMinter,
      destinationBlockchain,
      destinationMinter,
      payFeesIn,
    } = taskArguments;

    console.log("taskArguments", taskArguments);
    const privateKey = getPrivateKey();
    const sourceRpcProviderUrl = getProviderRpcUrl(sourceBlockchain);

    const sourceProvider = new providers.JsonRpcProvider(sourceRpcProviderUrl);
    const wallet = new Wallet(privateKey);
    const signer = wallet.connect(sourceProvider);

    const spinner: Spinner = new Spinner();

    const knexusItemSourceMinter: KnexusItemSourceMinter =
      KnexusItemSourceMinter__factory.connect(sourceMinter, signer);

    const destinationChainSelector = getRouterConfig(
      destinationBlockchain
    ).chainSelector;
    const fees = getPayFeesIn(payFeesIn);

    console.log(
      `ℹ️  Attempting to call the mint function of the SourceMinter.sol smart contract on the ${sourceBlockchain} from ${signer.address} account`
    );
    spinner.start();

    console.log("destinationChainSelector", destinationChainSelector);
    console.log("destinationMinter", destinationMinter);
    console.log("fees", fees);

    const tx = await knexusItemSourceMinter.authorise(
      destinationChainSelector,
      destinationMinter,
      fees,
      "https://knn3-knexus.s3.us-west-2.amazonaws.com/287ee780-f04e-45b2-b876-7cc3742b40ce_16932966887461693296687735.json",
      10,
      "0041d649-e9f9-4206-b60a-d7a34e96167a"

      // {
      // gasPrice: BigNumber.from("100000000000"),
      // gasLimit: 100000,
      // nonce: 464,
      // nonce: 456,
      // }
    );

    const receipt = await tx.wait();

    spinner.stop();
    console.log(`✅ Mint request sent, transaction hash: ${tx.hash}`);

    await getCcipMessageId(tx, receipt, sourceProvider);

    console.log(`✅ Task cross-chain-mint finished with the execution`);
  });
