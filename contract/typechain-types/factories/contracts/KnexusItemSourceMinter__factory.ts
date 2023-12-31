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
  KnexusItemSourceMinter,
  KnexusItemSourceMinterInterface,
} from "../../contracts/KnexusItemSourceMinter";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
      {
        internalType: "address",
        name: "link",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "FailedToWithdrawEth",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "MessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "enum KnexusItemSourceMinter.PayFeesIn",
        name: "payFeesIn",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_maxSupply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_metadataId",
        type: "string",
      },
    ],
    name: "authorise",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "enum KnexusItemSourceMinter.PayFeesIn",
        name: "payFeesIn",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "tokenOwnerCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenOwners",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokens",
    outputs: [
      {
        components: [
          {
            internalType: "enum KnexusItemSourceMinter.TokenType",
            name: "tokenType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenIdOrAmount",
            type: "uint256",
          },
        ],
        internalType: "struct KnexusItemSourceMinter.Price",
        name: "price",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "currentSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxSupply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "metadataId",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "withdrawToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60c06040523480156200001157600080fd5b50604051620014ae380380620014ae833981016040819052620000349162000217565b33806000816200008b5760405162461bcd60e51b815260206004820152601860248201527f43616e6e6f7420736574206f776e657220746f207a65726f000000000000000060448201526064015b60405180910390fd5b600080546001600160a01b0319166001600160a01b0384811691909117909155811615620000be57620000be816200014f565b5050506001600160a01b03828116608081905290821660a081905260405163095ea7b360e01b8152600481019290925260001960248301529063095ea7b3906044016020604051808303816000875af115801562000120573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200014691906200024f565b5050506200027a565b336001600160a01b03821603620001a95760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000604482015260640162000082565b600180546001600160a01b0319166001600160a01b0383811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b80516001600160a01b03811681146200021257600080fd5b919050565b600080604083850312156200022b57600080fd5b6200023683620001fa565b91506200024660208401620001fa565b90509250929050565b6000602082840312156200026257600080fd5b815180151581146200027357600080fd5b9392505050565b60805160a0516111f2620002bc600039600081816105e70152610af601526000818161062e015281816106ef015281816107870152610bac01526111f26000f3fe6080604052600436106100955760003560e01c806386ac1cb91161005957806386ac1cb9146101515780638da5cb5b14610171578063db0f3310146101a3578063f2fde38b146101c7578063f8a14f46146101e757600080fd5b80633aeac4e1146100a15780634f64b2be146100c357806351cff8d9146100fc57806353ce44691461011c57806379ba50971461013c57600080fd5b3661009c57005b600080fd5b3480156100ad57600080fd5b506100c16100bc366004610d11565b61021d565b005b3480156100cf57600080fd5b506100e36100de366004610d44565b61030d565b6040516100f39493929190610db9565b60405180910390f35b34801561010857600080fd5b506100c1610117366004610e25565b61041a565b34801561012857600080fd5b506100c1610137366004610efa565b6104b8565b34801561014857600080fd5b506100c1610844565b34801561015d57600080fd5b506100c161016c366004610faf565b6108ee565b34801561017d57600080fd5b506000546001600160a01b03165b6040516001600160a01b0390911681526020016100f3565b3480156101af57600080fd5b506101b960035481565b6040519081526020016100f3565b3480156101d357600080fd5b506100c16101e2366004610e25565b610be3565b3480156101f357600080fd5b5061018b610202366004610d44565b6004602052600090815260409020546001600160a01b031681565b610225610bf7565b6040516370a0823160e01b81523060048201526000906001600160a01b038316906370a0823190602401602060405180830381865afa15801561026c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102909190611040565b60405163a9059cbb60e01b81526001600160a01b038581166004830152602482018390529192509083169063a9059cbb906044016020604051808303816000875af11580156102e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103079190611059565b50505050565b6002602052600090815260409081902081516060810190925280549091908290829060ff16600181111561034357610343610d5d565b600181111561035457610354610d5d565b8152815461010090046001600160a01b0316602082015260019091015460409091015260028201546003830154600484018054939492939192916103979061107b565b80601f01602080910402602001604051908101604052809291908181526020018280546103c39061107b565b80156104105780601f106103e557610100808354040283529160200191610410565b820191906000526020600020905b8154815290600101906020018083116103f357829003601f168201915b5050505050905084565b610422610bf7565b60405147906000906001600160a01b0384169083908381818185875af1925050503d806000811461046f576040519150601f19603f3d011682016040523d82523d6000602084013e610474565b606091505b50509050806104b357604051639d11f56360e01b81523360048201526001600160a01b0384166024820152604481018390526064015b60405180910390fd5b505050565b816001146104fc5760405162461bcd60e51b815260206004820152601160248201527043616e206f6e6c79206d696e74206f6e6560781b60448201526064016104aa565b6040805160a081019091526001600160a01b03861660c08201526000908060e0810160405160208183030381529060405281526020013386868660405160240161054994939291906110b5565b60408051601f19818403018152919052602080820180516001600160e01b031663e32c0f3960e01b1790529082520160006040519080825280602002602001820160405280156105bf57816020015b60408051808201909152600080825260208201528152602001906001900390816105985790505b50815260200160018760018111156105d9576105d9610d5d565b146105e5576000610607565b7f00000000000000000000000000000000000000000000000000000000000000005b6001600160a01b0316815260200160405180602001604052806000815250815250905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166320487ded89846040518363ffffffff1660e01b815260040161067a9291906110e2565b602060405180830381865afa158015610697573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106bb9190611040565b9050600060018760018111156106d3576106d3610d5d565b03610770576040516396f4e9f960e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906396f4e9f990610726908c9087906004016110e2565b6020604051808303816000875af1158015610745573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107699190611040565b9050610806565b6040516396f4e9f960e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906396f4e9f99084906107c0908d9088906004016110e2565b60206040518083038185885af11580156107de573d6000803e3d6000fd5b50505050506040513d601f19601f820116820180604052508101906108039190611040565b90505b6040518181527f54791b38f3859327992a1ca0590ad3c0f08feba98d1a4f56ab0dca74d203392a9060200160405180910390a1505050505050505050565b6001546001600160a01b031633146108975760405162461bcd60e51b815260206004820152601660248201527526bab9ba10313290383937b837b9b2b21037bbb732b960511b60448201526064016104aa565b60008054336001600160a01b0319808316821784556001805490911690556040516001600160a01b0390921692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a350565b6000821161094f5760405162461bcd60e51b815260206004820152602860248201527f496e697469616c20416d6f756e74206d7573742062652067726561746572207460448201526768616e207a65726f60c01b60648201526084016104aa565b6040805160a081019091526001600160a01b03861660c08201526000908060e0810160408051808303601f190181529181529082525133602482015260806044820152607360a48201527f68747470733a2f2f6b6e6e332d6b6e657875732e73332e75732d776573742d3260c48201527f2e616d617a6f6e6177732e636f6d2f32383765653738302d663034652d34356260e48201527f322d623837362d3763633337343262343063655f313639333239363638383734610104820152721b189b1c99991c9b1b1c1b9b999a973539b7b760691b610124820152600a606482015261012060848201526004610144820152631899191960e11b6101648201526020909101906101840160408051601f19818403018152919052602080820180516001600160e01b0316630b3fdc0b60e31b179052908252016000604051908082528060200260200182016040528015610ace57816020015b6040805180820190915260008082526020820152815260200190600190039081610aa75790505b5081526020016001876001811115610ae857610ae8610d5d565b14610af4576000610b16565b7f00000000000000000000000000000000000000000000000000000000000000005b6001600160a01b03168152602001610b8d60405180604001604052806301312d008152602001600015158152506040805182516024820152602092830151151560448083019190915282518083039091018152606490910190915290810180516001600160e01b03166397a657c960e01b17905290565b90526040516320487ded60e01b81529091506000906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906320487ded9061067a908b9086906004016110e2565b610beb610bf7565b610bf481610c4c565b50565b6000546001600160a01b03163314610c4a5760405162461bcd60e51b815260206004820152601660248201527527b7363c9031b0b63630b1363290313c9037bbb732b960511b60448201526064016104aa565b565b336001600160a01b03821603610ca45760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c6600000000000000000060448201526064016104aa565b600180546001600160a01b0319166001600160a01b0383811691821790925560008054604051929316917fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae12789190a350565b80356001600160a01b0381168114610d0c57600080fd5b919050565b60008060408385031215610d2457600080fd5b610d2d83610cf5565b9150610d3b60208401610cf5565b90509250929050565b600060208284031215610d5657600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6000815180845260005b81811015610d9957602081850181015186830182015201610d7d565b506000602082860101526020601f19601f83011685010191505092915050565b6000855160028110610ddb57634e487b7160e01b600052602160045260246000fd5b8083525060018060a01b0360208701511660208301526040860151604083015284606083015283608083015260c060a0830152610e1b60c0830184610d73565b9695505050505050565b600060208284031215610e3757600080fd5b610e4082610cf5565b9392505050565b803567ffffffffffffffff81168114610d0c57600080fd5b803560028110610d0c57600080fd5b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115610e9f57610e9f610e6e565b604051601f8501601f19908116603f01168101908282118183101715610ec757610ec7610e6e565b81604052809350858152868686011115610ee057600080fd5b858560208301376000602087830101525050509392505050565b60008060008060008060c08789031215610f1357600080fd5b610f1c87610e47565b9550610f2a60208801610cf5565b9450610f3860408801610e5f565b9350606087013592506080870135915060a087013567ffffffffffffffff811115610f6257600080fd5b8701601f81018913610f7357600080fd5b610f8289823560208401610e84565b9150509295509295509295565b600082601f830112610fa057600080fd5b610e4083833560208501610e84565b60008060008060008060c08789031215610fc857600080fd5b610fd187610e47565b9550610fdf60208801610cf5565b9450610fed60408801610e5f565b9350606087013567ffffffffffffffff8082111561100a57600080fd5b6110168a838b01610f8f565b94506080890135935060a089013591508082111561103357600080fd5b50610f8289828a01610f8f565b60006020828403121561105257600080fd5b5051919050565b60006020828403121561106b57600080fd5b81518015158114610e4057600080fd5b600181811c9082168061108f57607f821691505b6020821081036110af57634e487b7160e01b600052602260045260246000fd5b50919050565b60018060a01b0385168152836020820152826040820152608060608201526000610e1b6080830184610d73565b6000604067ffffffffffffffff8516835260208181850152845160a08386015261110f60e0860182610d73565b905081860151603f198087840301606088015261112c8383610d73565b88860151888203830160808a01528051808352908601945060009350908501905b8084101561117f57845180516001600160a01b031683528601518683015293850193600193909301929086019061114d565b5060608901516001600160a01b031660a08901526080890151888203830160c08a015295506111ae8187610d73565b9a995050505050505050505056fea2646970667358221220bb25a7f214025a56c6a24e7633d8faab6d7e34cf1ab1cd814a33502a1616299464736f6c63430008130033";

type KnexusItemSourceMinterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KnexusItemSourceMinterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class KnexusItemSourceMinter__factory extends ContractFactory {
  constructor(...args: KnexusItemSourceMinterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    router: AddressLike,
    link: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(router, link, overrides || {});
  }
  override deploy(
    router: AddressLike,
    link: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(router, link, overrides || {}) as Promise<
      KnexusItemSourceMinter & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): KnexusItemSourceMinter__factory {
    return super.connect(runner) as KnexusItemSourceMinter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KnexusItemSourceMinterInterface {
    return new Interface(_abi) as KnexusItemSourceMinterInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): KnexusItemSourceMinter {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as KnexusItemSourceMinter;
  }
}
