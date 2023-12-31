/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace KnexusItemSourceMinter {
  export type PriceStruct = {
    tokenType: BigNumberish;
    asset: AddressLike;
    tokenIdOrAmount: BigNumberish;
  };

  export type PriceStructOutput = [
    tokenType: bigint,
    asset: string,
    tokenIdOrAmount: bigint
  ] & { tokenType: bigint; asset: string; tokenIdOrAmount: bigint };
}

export interface KnexusItemSourceMinterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "acceptOwnership"
      | "authorise"
      | "mint"
      | "owner"
      | "tokenOwnerCount"
      | "tokenOwners"
      | "tokens"
      | "transferOwnership"
      | "withdraw"
      | "withdrawToken"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "MessageSent"
      | "OwnershipTransferRequested"
      | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "authorise",
    values: [
      BigNumberish,
      AddressLike,
      BigNumberish,
      string,
      BigNumberish,
      string
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [
      BigNumberish,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenOwnerCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "tokenOwners",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [AddressLike, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "authorise", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenOwnerCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenOwners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;
}

export namespace MessageSentEvent {
  export type InputTuple = [messageId: BytesLike];
  export type OutputTuple = [messageId: string];
  export interface OutputObject {
    messageId: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferRequestedEvent {
  export type InputTuple = [from: AddressLike, to: AddressLike];
  export type OutputTuple = [from: string, to: string];
  export interface OutputObject {
    from: string;
    to: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [from: AddressLike, to: AddressLike];
  export type OutputTuple = [from: string, to: string];
  export interface OutputObject {
    from: string;
    to: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface KnexusItemSourceMinter extends BaseContract {
  connect(runner?: ContractRunner | null): KnexusItemSourceMinter;
  waitForDeployment(): Promise<this>;

  interface: KnexusItemSourceMinterInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  acceptOwnership: TypedContractMethod<[], [void], "nonpayable">;

  authorise: TypedContractMethod<
    [
      destinationChainSelector: BigNumberish,
      receiver: AddressLike,
      payFeesIn: BigNumberish,
      _tokenURI: string,
      _maxSupply: BigNumberish,
      _metadataId: string
    ],
    [void],
    "nonpayable"
  >;

  mint: TypedContractMethod<
    [
      destinationChainSelector: BigNumberish,
      receiver: AddressLike,
      payFeesIn: BigNumberish,
      _tokenId: BigNumberish,
      _value: BigNumberish,
      _data: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  tokenOwnerCount: TypedContractMethod<[], [bigint], "view">;

  tokenOwners: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  tokens: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [KnexusItemSourceMinter.PriceStructOutput, bigint, bigint, string] & {
        price: KnexusItemSourceMinter.PriceStructOutput;
        currentSupply: bigint;
        maxSupply: bigint;
        metadataId: string;
      }
    ],
    "view"
  >;

  transferOwnership: TypedContractMethod<
    [to: AddressLike],
    [void],
    "nonpayable"
  >;

  withdraw: TypedContractMethod<
    [beneficiary: AddressLike],
    [void],
    "nonpayable"
  >;

  withdrawToken: TypedContractMethod<
    [beneficiary: AddressLike, token: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "acceptOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "authorise"
  ): TypedContractMethod<
    [
      destinationChainSelector: BigNumberish,
      receiver: AddressLike,
      payFeesIn: BigNumberish,
      _tokenURI: string,
      _maxSupply: BigNumberish,
      _metadataId: string
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "mint"
  ): TypedContractMethod<
    [
      destinationChainSelector: BigNumberish,
      receiver: AddressLike,
      payFeesIn: BigNumberish,
      _tokenId: BigNumberish,
      _value: BigNumberish,
      _data: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "tokenOwnerCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "tokenOwners"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "tokens"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [KnexusItemSourceMinter.PriceStructOutput, bigint, bigint, string] & {
        price: KnexusItemSourceMinter.PriceStructOutput;
        currentSupply: bigint;
        maxSupply: bigint;
        metadataId: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[to: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[beneficiary: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawToken"
  ): TypedContractMethod<
    [beneficiary: AddressLike, token: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "MessageSent"
  ): TypedContractEvent<
    MessageSentEvent.InputTuple,
    MessageSentEvent.OutputTuple,
    MessageSentEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferRequested"
  ): TypedContractEvent<
    OwnershipTransferRequestedEvent.InputTuple,
    OwnershipTransferRequestedEvent.OutputTuple,
    OwnershipTransferRequestedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "MessageSent(bytes32)": TypedContractEvent<
      MessageSentEvent.InputTuple,
      MessageSentEvent.OutputTuple,
      MessageSentEvent.OutputObject
    >;
    MessageSent: TypedContractEvent<
      MessageSentEvent.InputTuple,
      MessageSentEvent.OutputTuple,
      MessageSentEvent.OutputObject
    >;

    "OwnershipTransferRequested(address,address)": TypedContractEvent<
      OwnershipTransferRequestedEvent.InputTuple,
      OwnershipTransferRequestedEvent.OutputTuple,
      OwnershipTransferRequestedEvent.OutputObject
    >;
    OwnershipTransferRequested: TypedContractEvent<
      OwnershipTransferRequestedEvent.InputTuple,
      OwnershipTransferRequestedEvent.OutputTuple,
      OwnershipTransferRequestedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
