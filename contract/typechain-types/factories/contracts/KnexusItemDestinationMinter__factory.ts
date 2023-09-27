/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  KnexusItemDestinationMinter,
  KnexusItemDestinationMinterInterface,
} from "../../contracts/KnexusItemDestinationMinter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "nftAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [],
    name: "MintCallSuccessfull",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161064738038061064783398101604081905261002f916100a2565b816001600160a01b03811661005e576040516335fdcccd60e21b81526000600482015260240160405180910390fd5b6001600160a01b03908116608052600080546001600160a01b03191692909116919091179055506100dc565b6001600160a01b038116811461009f57600080fd5b50565b600080604083850312156100b557600080fd5b82516100c08161008a565b60208401519092506100d18161008a565b809150509250929050565b60805161054b6100fc600039600081816090015260fc015261054b6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806301ffc9a71461004657806385572ffb1461006e578063b0f479a114610083575b600080fd5b6100596100543660046101f3565b6100ba565b60405190151581526020015b60405180910390f35b61008161007c366004610224565b6100f1565b005b6040516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152602001610065565b60006001600160e01b031982166385572ffb60e01b14806100eb57506001600160e01b031982166301ffc9a760e01b145b92915050565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610140576040516335fdcccd60e21b815233600482015260240160405180910390fd5b61015161014c82610439565b610154565b50565b6000805460608301516040516001600160a01b039092169161017691906104e6565b6000604051808303816000865af19150503d80600081146101b3576040519150601f19603f3d011682016040523d82523d6000602084013e6101b8565b606091505b50509050806101c657600080fd5b6040517fa8bcb6a278444293ea5c0bce4a4734a060a5f557bb999d8a57c4f69e96f1fe8890600090a15050565b60006020828403121561020557600080fd5b81356001600160e01b03198116811461021d57600080fd5b9392505050565b60006020828403121561023657600080fd5b813567ffffffffffffffff81111561024d57600080fd5b820160a0818503121561021d57600080fd5b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156102985761029861025f565b60405290565b60405160a0810167ffffffffffffffff811182821017156102985761029861025f565b604051601f8201601f1916810167ffffffffffffffff811182821017156102ea576102ea61025f565b604052919050565b803567ffffffffffffffff8116811461030a57600080fd5b919050565b600082601f83011261032057600080fd5b813567ffffffffffffffff81111561033a5761033a61025f565b61034d601f8201601f19166020016102c1565b81815284602083860101111561036257600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f83011261039057600080fd5b8135602067ffffffffffffffff8211156103ac576103ac61025f565b6103ba818360051b016102c1565b82815260069290921b840181019181810190868411156103d957600080fd5b8286015b8481101561042e57604081890312156103f65760008081fd5b6103fe610275565b81356001600160a01b03811681146104165760008081fd5b815281850135858201528352918301916040016103dd565b509695505050505050565b600060a0823603121561044b57600080fd5b61045361029e565b82358152610463602084016102f2565b6020820152604083013567ffffffffffffffff8082111561048357600080fd5b61048f3683870161030f565b604084015260608501359150808211156104a857600080fd5b6104b43683870161030f565b606084015260808501359150808211156104cd57600080fd5b506104da3682860161037f565b60808301525092915050565b6000825160005b8181101561050757602081860181015185830152016104ed565b50600092019182525091905056fea26469706673582212206a371159209ba94aa3395987c8b600cfae460a93ceb3a27cb0bc35d4557fb8f664736f6c63430008130033";

type KnexusItemDestinationMinterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KnexusItemDestinationMinterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class KnexusItemDestinationMinter__factory extends ContractFactory {
  constructor(...args: KnexusItemDestinationMinterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    router: AddressLike,
    nftAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(router, nftAddress, overrides || {});
  }
  override deploy(
    router: AddressLike,
    nftAddress: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(router, nftAddress, overrides || {}) as Promise<
      KnexusItemDestinationMinter & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): KnexusItemDestinationMinter__factory {
    return super.connect(runner) as KnexusItemDestinationMinter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KnexusItemDestinationMinterInterface {
    return new Interface(_abi) as KnexusItemDestinationMinterInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): KnexusItemDestinationMinter {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as KnexusItemDestinationMinter;
  }
}
