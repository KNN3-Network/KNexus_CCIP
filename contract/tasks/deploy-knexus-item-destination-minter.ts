import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getPrivateKey, getProviderRpcUrl, getRouterConfig } from "./utils";
import { Wallet, providers } from "ethers";
import {
  KnexusItemDestinationMinter,
  KnexusItemDestinationMinter__factory,
  KnexusItemCCIP,
  KnexusItemCCIP__factory,
} from "../typechain-types";
import { Spinner } from "../utils/spinner";

task(
  `deploy-knexus-item-destination-minter`,
  `Deploys MyNFT.sol and DestinationMinter.sol smart contracts`
)
  .addOptionalParam(
    `router`,
    `The address of the Router contract on the destination blockchain`
  )
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const routerAddress = taskArguments.router
        ? taskArguments.router
        : getRouterConfig(hre.network.name).address;

      const privateKey = getPrivateKey();
      const rpcProviderUrl = getProviderRpcUrl(hre.network.name);

      const provider = new providers.JsonRpcProvider(rpcProviderUrl);
      const wallet = new Wallet(privateKey);
      const deployer = wallet.connect(provider);

      const spinner: Spinner = new Spinner();

      console.log(
        `ℹ️  Attempting to deploy MyNFT smart contract on the ${hre.network.name} blockchain using ${deployer.address} address`
      );
      spinner.start();

      const MyKnexusItemCCIP: KnexusItemCCIP__factory =
        (await hre.ethers.getContractFactory(
          "KnexusItemCCIP"
        )) as KnexusItemCCIP__factory;
      const knexusItemCCIP: KnexusItemCCIP = await MyKnexusItemCCIP.deploy();
      await knexusItemCCIP.deployed();

      spinner.stop();
      console.log(
        `✅ MyNFT contract deployed at address ${knexusItemCCIP.address} on the ${hre.network.name} blockchain`
      );

      console.log(
        `ℹ️  Attempting to deploy DestinationMinter smart contract on the ${hre.network.name} blockchain using ${deployer.address} address, with the Router address ${routerAddress} provided as constructor argument`
      );
      spinner.start();

      const knexusItemDestinationMinter: KnexusItemDestinationMinter__factory =
        (await hre.ethers.getContractFactory(
          "DestinationMinter"
        )) as KnexusItemDestinationMinter__factory;
      const myKnexusItemDestinationMinter: KnexusItemDestinationMinter =
        await knexusItemDestinationMinter.deploy(
          routerAddress,
          knexusItemCCIP.address
        );
      await myKnexusItemDestinationMinter.deployed();

      spinner.stop();
      console.log(
        `✅ DestinationMinter contract deployed at address ${myKnexusItemDestinationMinter.address} on the ${hre.network.name} blockchain`
      );

      console.log(
        `ℹ️  Attempting to grant the minter role to the DestinationMinter smart contract`
      );
      spinner.start();

      const tx = await knexusItemCCIP.grant(
        myKnexusItemDestinationMinter.address,
        "1"
      );
      await tx.wait();

      spinner.stop();
      console.log(
        `✅ DestinationMinter can now mint MyNFTs. Transaction hash: ${tx.hash}`
      );
    }
  );
