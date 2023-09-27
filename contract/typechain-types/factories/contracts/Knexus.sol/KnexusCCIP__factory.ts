/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  KnexusCCIP,
  KnexusCCIPInterface,
} from "../../../contracts/Knexus.sol/KnexusCCIP";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dispatcher",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bool",
        name: "whitelisted",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "DispatcherlistedChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ccipMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dispatcher",
        type: "address",
      },
      {
        internalType: "bool",
        name: "whitelist",
        type: "bool",
      },
    ],
    name: "dispatcherlistedCreator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dispatcher",
        type: "address",
      },
    ],
    name: "isDispatcherlisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "publicMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600681526020017f4b6e6578757300000000000000000000000000000000000000000000000000008152506040518060400160405280600281526020017f4b4e00000000000000000000000000000000000000000000000000000000000081525081600090816200008f919062000412565b508060019081620000a1919062000412565b505050620000c4620000b8620000ca60201b60201c565b620000d260201b60201c565b620004f9565b600033905090565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200021a57607f821691505b60208210810362000230576200022f620001d2565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200029a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200025b565b620002a686836200025b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620002f3620002ed620002e784620002be565b620002c8565b620002be565b9050919050565b6000819050919050565b6200030f83620002d2565b620003276200031e82620002fa565b84845462000268565b825550505050565b600090565b6200033e6200032f565b6200034b81848462000304565b505050565b5b8181101562000373576200036760008262000334565b60018101905062000351565b5050565b601f821115620003c2576200038c8162000236565b62000397846200024b565b81016020851015620003a7578190505b620003bf620003b6856200024b565b83018262000350565b50505b505050565b600082821c905092915050565b6000620003e760001984600802620003c7565b1980831691505092915050565b6000620004028383620003d4565b9150826002028217905092915050565b6200041d8262000198565b67ffffffffffffffff811115620004395762000438620001a3565b5b62000445825462000201565b6200045282828562000377565b600060209050601f8311600181146200048a576000841562000475578287015190505b620004818582620003f4565b865550620004f1565b601f1984166200049a8662000236565b60005b82811015620004c4578489015182556001820191506020850194506020810190506200049d565b86831015620004e45784890151620004e0601f891682620003d4565b8355505b6001600288020188555050505b505050505050565b6134ea80620005096000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806370a08231116100ad578063abf1b21711610071578063abf1b2171461032d578063b88d4fde14610349578063c87b56dd14610365578063e985e9c514610395578063f2fde38b146103c55761012c565b806370a082311461029b578063715018a6146102cb5780638da5cb5b146102d557806395d89b41146102f3578063a22cb465146103115761012c565b806332a93a3a116100f457806332a93a3a146101e757806342842e0e14610203578063484a56151461021f5780636352211e1461024f578063663ac62f1461027f5761012c565b806301ffc9a71461013157806306fdde0314610161578063081812fc1461017f578063095ea7b3146101af57806323b872dd146101cb575b600080fd5b61014b60048036038101906101469190611ee0565b6103e1565b6040516101589190611f28565b60405180910390f35b6101696103f3565b6040516101769190611fd3565b60405180910390f35b6101996004803603810190610194919061202b565b610485565b6040516101a69190612099565b60405180910390f35b6101c960048036038101906101c491906120e0565b61050a565b005b6101e560048036038101906101e09190612120565b610621565b005b61020160048036038101906101fc9190612173565b610681565b005b61021d60048036038101906102189190612120565b6106c6565b005b61023960048036038101906102349190612173565b6106e6565b6040516102469190611f28565b60405180910390f35b6102696004803603810190610264919061202b565b61073c565b6040516102769190612099565b60405180910390f35b610299600480360381019061029491906121cc565b6107ed565b005b6102b560048036038101906102b09190612173565b610915565b6040516102c2919061221b565b60405180910390f35b6102d36109cc565b005b6102dd610a54565b6040516102ea9190612099565b60405180910390f35b6102fb610a7e565b6040516103089190611fd3565b60405180910390f35b61032b600480360381019061032691906121cc565b610b10565b005b61034760048036038101906103429190612173565b610c90565b005b610363600480360381019061035e919061236b565b610d61565b005b61037f600480360381019061037a919061202b565b610dc3565b60405161038c9190611fd3565b60405180910390f35b6103af60048036038101906103aa91906123ee565b610dd5565b6040516103bc9190611f28565b60405180910390f35b6103df60048036038101906103da9190612173565b610e69565b005b60006103ec82610f60565b9050919050565b6060600080546104029061245d565b80601f016020809104026020016040519081016040528092919081815260200182805461042e9061245d565b801561047b5780601f106104505761010080835404028352916020019161047b565b820191906000526020600020905b81548152906001019060200180831161045e57829003601f168201915b5050505050905090565b600061049082611042565b6104cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c690612500565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006105158261073c565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610585576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161057c90612592565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105a46110ae565b73ffffffffffffffffffffffffffffffffffffffff1614806105d357506105d2816105cd6110ae565b610dd5565b5b610612576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060990612624565b60405180910390fd5b61061c83836110b6565b505050565b61063261062c6110ae565b8261116f565b610671576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610668906126b6565b60405180910390fd5b61067c83838361124d565b505050565b61068d816008546114a8565b6106b1600854604051806080016040528060428152602001613473604291396114c6565b60086000815480929190600101919050555050565b6106e183838360405180602001604052806000815250610d61565b505050565b6000600960008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036107e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107db90612748565b60405180910390fd5b80915050919050565b6107f56110ae565b73ffffffffffffffffffffffffffffffffffffffff16610813610a54565b73ffffffffffffffffffffffffffffffffffffffff1614610869576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610860906127b4565b60405180910390fd5b80600960008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508015158273ffffffffffffffffffffffffffffffffffffffff167f1e6dfb00a10b42e70a98af178a49ea6d4b89edd0834a73ac51e96911853f75ec42604051610909919061221b565b60405180910390a35050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610985576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097c90612846565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6109d46110ae565b73ffffffffffffffffffffffffffffffffffffffff166109f2610a54565b73ffffffffffffffffffffffffffffffffffffffff1614610a48576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3f906127b4565b60405180910390fd5b610a526000611533565b565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060018054610a8d9061245d565b80601f0160208091040260200160405190810160405280929190818152602001828054610ab99061245d565b8015610b065780601f10610adb57610100808354040283529160200191610b06565b820191906000526020600020905b815481529060010190602001808311610ae957829003601f168201915b5050505050905090565b610b186110ae565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b85576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7c906128b2565b60405180910390fd5b8060056000610b926110ae565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff16610c3f6110ae565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610c849190611f28565b60405180910390a35050565b600960003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610d1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d139061291e565b60405180910390fd5b610d28816008546114a8565b610d4c600854604051806080016040528060428152602001613473604291396114c6565b60086000815480929190600101919050555050565b610d72610d6c6110ae565b8361116f565b610db1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610da8906126b6565b60405180910390fd5b610dbd848484846115f9565b50505050565b6060610dce82611655565b9050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610e716110ae565b73ffffffffffffffffffffffffffffffffffffffff16610e8f610a54565b73ffffffffffffffffffffffffffffffffffffffff1614610ee5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610edc906127b4565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610f54576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4b906129b0565b60405180910390fd5b610f5d81611533565b50565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061102b57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061103b575061103a826117a6565b5b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff166111298361073c565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600061117a82611042565b6111b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111b090612a42565b60405180910390fd5b60006111c48361073c565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061123357508373ffffffffffffffffffffffffffffffffffffffff1661121b84610485565b73ffffffffffffffffffffffffffffffffffffffff16145b8061124457506112438185610dd5565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661126d8261073c565b73ffffffffffffffffffffffffffffffffffffffff16146112c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112ba90612ad4565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611332576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161132990612b66565b60405180910390fd5b61133d838383611810565b6113486000826110b6565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546113989190612bb5565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546113ef9190612be9565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6114c282826040518060200160405280600081525061188f565b5050565b6114cf82611042565b61150e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161150590612c8f565b60405180910390fd5b8060066000848152602001908152602001600020908161152e9190612e5b565b505050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b61160484848461124d565b611610848484846118ea565b61164f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161164690612f9f565b60405180910390fd5b50505050565b606061166082611042565b61169f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161169690613031565b60405180910390fd5b60006006600084815260200190815260200160002080546116bf9061245d565b80601f01602080910402602001604051908101604052809291908181526020018280546116eb9061245d565b80156117385780601f1061170d57610100808354040283529160200191611738565b820191906000526020600020905b81548152906001019060200180831161171b57829003601f168201915b505050505090506000611749611a71565b9050600081510361175e5781925050506117a1565b60008251111561179357808260405160200161177b92919061308d565b604051602081830303815290604052925050506117a1565b61179c84611a88565b925050505b919050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461187f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611876906130fd565b60405180910390fd5b61188a838383611b2f565b505050565b6118998383611b34565b6118a660008484846118ea565b6118e5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118dc90612f9f565b60405180910390fd5b505050565b600061190b8473ffffffffffffffffffffffffffffffffffffffff16611d01565b15611a64578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026119346110ae565b8786866040518563ffffffff1660e01b81526004016119569493929190613172565b6020604051808303816000875af192505050801561199257506040513d601f19601f8201168201806040525081019061198f91906131d3565b60015b611a14573d80600081146119c2576040519150601f19603f3d011682016040523d82523d6000602084013e6119c7565b606091505b506000815103611a0c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a0390612f9f565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611a69565b600190505b949350505050565b606060405180602001604052806000815250905090565b6060611a9382611042565b611ad2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ac990613272565b60405180910390fd5b6000611adc611a71565b90506000815111611afc5760405180602001604052806000815250611b27565b80611b0684611d14565b604051602001611b1792919061308d565b6040516020818303038152906040525b915050919050565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611ba3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b9a906132de565b60405180910390fd5b611bac81611042565b15611bec576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611be39061334a565b60405180910390fd5b611bf860008383611810565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611c489190612be9565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b600080823b905060008111915050919050565b606060008203611d5b576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611e6f565b600082905060005b60008214611d8d578080611d769061336a565b915050600a82611d8691906133e1565b9150611d63565b60008167ffffffffffffffff811115611da957611da8612240565b5b6040519080825280601f01601f191660200182016040528015611ddb5781602001600182028036833780820191505090505b5090505b60008514611e6857600182611df49190612bb5565b9150600a85611e039190613412565b6030611e0f9190612be9565b60f81b818381518110611e2557611e24613443565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a85611e6191906133e1565b9450611ddf565b8093505050505b919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611ebd81611e88565b8114611ec857600080fd5b50565b600081359050611eda81611eb4565b92915050565b600060208284031215611ef657611ef5611e7e565b5b6000611f0484828501611ecb565b91505092915050565b60008115159050919050565b611f2281611f0d565b82525050565b6000602082019050611f3d6000830184611f19565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611f7d578082015181840152602081019050611f62565b60008484015250505050565b6000601f19601f8301169050919050565b6000611fa582611f43565b611faf8185611f4e565b9350611fbf818560208601611f5f565b611fc881611f89565b840191505092915050565b60006020820190508181036000830152611fed8184611f9a565b905092915050565b6000819050919050565b61200881611ff5565b811461201357600080fd5b50565b60008135905061202581611fff565b92915050565b60006020828403121561204157612040611e7e565b5b600061204f84828501612016565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061208382612058565b9050919050565b61209381612078565b82525050565b60006020820190506120ae600083018461208a565b92915050565b6120bd81612078565b81146120c857600080fd5b50565b6000813590506120da816120b4565b92915050565b600080604083850312156120f7576120f6611e7e565b5b6000612105858286016120cb565b925050602061211685828601612016565b9150509250929050565b60008060006060848603121561213957612138611e7e565b5b6000612147868287016120cb565b9350506020612158868287016120cb565b925050604061216986828701612016565b9150509250925092565b60006020828403121561218957612188611e7e565b5b6000612197848285016120cb565b91505092915050565b6121a981611f0d565b81146121b457600080fd5b50565b6000813590506121c6816121a0565b92915050565b600080604083850312156121e3576121e2611e7e565b5b60006121f1858286016120cb565b9250506020612202858286016121b7565b9150509250929050565b61221581611ff5565b82525050565b6000602082019050612230600083018461220c565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61227882611f89565b810181811067ffffffffffffffff8211171561229757612296612240565b5b80604052505050565b60006122aa611e74565b90506122b6828261226f565b919050565b600067ffffffffffffffff8211156122d6576122d5612240565b5b6122df82611f89565b9050602081019050919050565b82818337600083830152505050565b600061230e612309846122bb565b6122a0565b90508281526020810184848401111561232a5761232961223b565b5b6123358482856122ec565b509392505050565b600082601f83011261235257612351612236565b5b81356123628482602086016122fb565b91505092915050565b6000806000806080858703121561238557612384611e7e565b5b6000612393878288016120cb565b94505060206123a4878288016120cb565b93505060406123b587828801612016565b925050606085013567ffffffffffffffff8111156123d6576123d5611e83565b5b6123e28782880161233d565b91505092959194509250565b6000806040838503121561240557612404611e7e565b5b6000612413858286016120cb565b9250506020612424858286016120cb565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061247557607f821691505b6020821081036124885761248761242e565b5b50919050565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b60006124ea602c83611f4e565b91506124f58261248e565b604082019050919050565b60006020820190508181036000830152612519816124dd565b9050919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b600061257c602183611f4e565b915061258782612520565b604082019050919050565b600060208201905081810360008301526125ab8161256f565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b600061260e603883611f4e565b9150612619826125b2565b604082019050919050565b6000602082019050818103600083015261263d81612601565b9050919050565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b60006126a0603183611f4e565b91506126ab82612644565b604082019050919050565b600060208201905081810360008301526126cf81612693565b9050919050565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b6000612732602983611f4e565b915061273d826126d6565b604082019050919050565b6000602082019050818103600083015261276181612725565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b600061279e602083611f4e565b91506127a982612768565b602082019050919050565b600060208201905081810360008301526127cd81612791565b9050919050565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b6000612830602a83611f4e565b915061283b826127d4565b604082019050919050565b6000602082019050818103600083015261285f81612823565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b600061289c601983611f4e565b91506128a782612866565b602082019050919050565b600060208201905081810360008301526128cb8161288f565b9050919050565b7f6e6f74207065726d697373696f6e000000000000000000000000000000000000600082015250565b6000612908600e83611f4e565b9150612913826128d2565b602082019050919050565b60006020820190508181036000830152612937816128fb565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061299a602683611f4e565b91506129a58261293e565b604082019050919050565b600060208201905081810360008301526129c98161298d565b9050919050565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b6000612a2c602c83611f4e565b9150612a37826129d0565b604082019050919050565b60006020820190508181036000830152612a5b81612a1f565b9050919050565b7f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960008201527f73206e6f74206f776e0000000000000000000000000000000000000000000000602082015250565b6000612abe602983611f4e565b9150612ac982612a62565b604082019050919050565b60006020820190508181036000830152612aed81612ab1565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612b50602483611f4e565b9150612b5b82612af4565b604082019050919050565b60006020820190508181036000830152612b7f81612b43565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612bc082611ff5565b9150612bcb83611ff5565b9250828203905081811115612be357612be2612b86565b5b92915050565b6000612bf482611ff5565b9150612bff83611ff5565b9250828201905080821115612c1757612c16612b86565b5b92915050565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b6000612c79602e83611f4e565b9150612c8482612c1d565b604082019050919050565b60006020820190508181036000830152612ca881612c6c565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302612d117fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612cd4565b612d1b8683612cd4565b95508019841693508086168417925050509392505050565b6000819050919050565b6000612d58612d53612d4e84611ff5565b612d33565b611ff5565b9050919050565b6000819050919050565b612d7283612d3d565b612d86612d7e82612d5f565b848454612ce1565b825550505050565b600090565b612d9b612d8e565b612da6818484612d69565b505050565b5b81811015612dca57612dbf600082612d93565b600181019050612dac565b5050565b601f821115612e0f57612de081612caf565b612de984612cc4565b81016020851015612df8578190505b612e0c612e0485612cc4565b830182612dab565b50505b505050565b600082821c905092915050565b6000612e3260001984600802612e14565b1980831691505092915050565b6000612e4b8383612e21565b9150826002028217905092915050565b612e6482611f43565b67ffffffffffffffff811115612e7d57612e7c612240565b5b612e87825461245d565b612e92828285612dce565b600060209050601f831160018114612ec55760008415612eb3578287015190505b612ebd8582612e3f565b865550612f25565b601f198416612ed386612caf565b60005b82811015612efb57848901518255600182019150602085019450602081019050612ed6565b86831015612f185784890151612f14601f891682612e21565b8355505b6001600288020188555050505b505050505050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612f89603283611f4e565b9150612f9482612f2d565b604082019050919050565b60006020820190508181036000830152612fb881612f7c565b9050919050565b7f45524337323155524953746f726167653a2055524920717565727920666f722060008201527f6e6f6e6578697374656e7420746f6b656e000000000000000000000000000000602082015250565b600061301b603183611f4e565b915061302682612fbf565b604082019050919050565b6000602082019050818103600083015261304a8161300e565b9050919050565b600081905092915050565b600061306782611f43565b6130718185613051565b9350613081818560208601611f5f565b80840191505092915050565b6000613099828561305c565b91506130a5828461305c565b91508190509392505050565b7f546f6b656e206973206e6f74207472616e7366657261626c6500000000000000600082015250565b60006130e7601983611f4e565b91506130f2826130b1565b602082019050919050565b60006020820190508181036000830152613116816130da565b9050919050565b600081519050919050565b600082825260208201905092915050565b60006131448261311d565b61314e8185613128565b935061315e818560208601611f5f565b61316781611f89565b840191505092915050565b6000608082019050613187600083018761208a565b613194602083018661208a565b6131a1604083018561220c565b81810360608301526131b38184613139565b905095945050505050565b6000815190506131cd81611eb4565b92915050565b6000602082840312156131e9576131e8611e7e565b5b60006131f7848285016131be565b91505092915050565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b600061325c602f83611f4e565b915061326782613200565b604082019050919050565b6000602082019050818103600083015261328b8161324f565b9050919050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b60006132c8602083611f4e565b91506132d382613292565b602082019050919050565b600060208201905081810360008301526132f7816132bb565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000613334601c83611f4e565b915061333f826132fe565b602082019050919050565b6000602082019050818103600083015261336381613327565b9050919050565b600061337582611ff5565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036133a7576133a6612b86565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006133ec82611ff5565b91506133f783611ff5565b925082613407576134066133b2565b5b828204905092915050565b600061341d82611ff5565b915061342883611ff5565b925082613438576134376133b2565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfe697066733a2f2f6261666b72656966736770756e78733635647a6633326c68366778726467753769797274616770696e64686c636f7437796a367472726b7636786da2646970667358221220886cc2cea23247e87d80ba19a7b43110702a1232ee5debf5d298a3291fd7107164736f6c63430008130033";

type KnexusCCIPConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KnexusCCIPConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class KnexusCCIP__factory extends ContractFactory {
  constructor(...args: KnexusCCIPConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      KnexusCCIP & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): KnexusCCIP__factory {
    return super.connect(runner) as KnexusCCIP__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KnexusCCIPInterface {
    return new Interface(_abi) as KnexusCCIPInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): KnexusCCIP {
    return new Contract(address, _abi, runner) as unknown as KnexusCCIP;
  }
}