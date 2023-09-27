import { BigNumber, ethers } from "ethers";
import { z } from "zod";

const addresses = {
  currentChainAddress: new Map([
    [80001, "0xF8E32b15545c7d814EABb3c904Dd050e7168F4C4"],
    [97, "0x2083E8c70ac9b186C264b182eb398eF954fc4e80"],
  ]),
  ccipDestinationSelector: new Map([
    [80001, BigNumber.from("12532609583862916517")],
    [97, BigNumber.from("13264668187771770619")],
  ]),
  ccipDestinationAddress: new Map([
    [80001, "0x4794Ca3dF7Cdb7dDa9d9835BAf0108cc0437b9A4"],
    [97, "0x6d884AB9f855686AbA015340c3D7edb991B60DEC"],
  ]),
};

export const claimOat = async (
  targetChainId: number,
): Promise<ContractOutput> => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const currentChainId = await signer.getChainId();
  let abi: Array<string>;
  let address: string;
  if (targetChainId === currentChainId) {
    abi = ["function mint(address to)"];
    address = addresses.currentChainAddress.get(targetChainId)!;
    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.mint(signer.getAddress());
    const receipt = await tx.wait();
    console.log(receipt);
    return {
      type: "NORMAL",
    };
  } else {
    address = "0x5Be09782c597B410a85cA612f194ad8B6e9713c0";
    abi = [
      "function mint(uint64 destinationChainSelector, address receiver, uint8 payFeesIn)",
    ];

    const destinationChainSelector =
      addresses.ccipDestinationSelector.get(targetChainId);
    const receiver = addresses.ccipDestinationAddress.get(targetChainId);

    const contract = new ethers.Contract(address, abi, signer);
    const tx = await contract.mint(destinationChainSelector, receiver, 1);
    const receipt = await tx.wait();
    console.log(receipt);
    const messageId = receipt.logs[2].data;
    return {
      type: "CCIP",
      messageId: messageId,
    };
  }
};

export const getBalance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const address = addresses.currentChainAddress.get(80001)!;
  const abi = ["function balanceOf(address owner) view returns (uint256)"];
  const contract = new ethers.Contract(address, abi, signer);
  const result = await contract.functions.balanceOf(signer.getAddress());
  const resultParsed = BigNumber.from(result[0]).toNumber();
  return resultParsed;
};

export const contractOutputSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("NORMAL"),
  }),
  z.object({
    type: z.literal("CCIP"),
    messageId: z.string(),
  }),
]);

type ContractOutput = z.infer<typeof contractOutputSchema>;
