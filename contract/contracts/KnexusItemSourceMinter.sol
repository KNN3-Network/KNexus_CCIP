// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Withdraw} from "./utils/Withdraw.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract KnexusItemSourceMinter is Withdraw {
    enum PayFeesIn {
        Native,
        LINK
    }

    enum TokenType {
        ERC20,
        ETHER
    }

    struct Price {
        TokenType tokenType;
        address asset;
        uint256 tokenIdOrAmount;
    }

    struct Token {
        Price price;
        uint256 currentSupply;
        uint256 maxSupply; // can't be changed
        string metadataId;
    }

    // token data
    mapping(uint256 => Token) public tokens;
    uint256 public tokenOwnerCount;
    mapping(uint256 => address) public tokenOwners;

    address immutable i_router;
    address immutable i_link;

    event MessageSent(bytes32 messageId);

    constructor(address router, address link) {
        i_router = router;
        i_link = link;
        LinkTokenInterface(i_link).approve(i_router, type(uint256).max);
    }

    receive() external payable {}

    function mint(
        uint64 destinationChainSelector,
        address receiver,
        PayFeesIn payFeesIn,
        uint256 _tokenId,
        uint256 _value,
        bytes memory _data
    ) external {
        // require(
        //     tokens[_tokenId].maxSupply >=
        //         (tokens[_tokenId].currentSupply + _value),
        //     "Max Supply Exceeded"
        // );

        // // address tokenOwner = tokenOwners[_tokenId];
        // tokens[_tokenId].currentSupply += _value;

        // address priceAsset = tokens[_tokenId].price.asset;
        // uint256 priceAmount = tokens[_tokenId].price.tokenIdOrAmount;

        // require(
        //     tokens[_tokenId].price.tokenType == TokenType.ERC20,
        //     "PriceAsset must be ERC20"
        // );

        // only one token is minted
        require(_value == 1, "Can only mint one");

        // IERC20(priceAsset).transferFrom(msg.sender, tokenOwner, priceAmount);

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature(
                "mintCCIP(address,uint256,uint256,bytes)",
                msg.sender,
                _tokenId,
                _value,
                _data
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        if (payFeesIn == PayFeesIn.LINK) {
            // LinkTokenInterface(i_link).approve(i_router, fee);
            messageId = IRouterClient(i_router).ccipSend(
                destinationChainSelector,
                message
            );
        } else {
            messageId = IRouterClient(i_router).ccipSend{value: fee}(
                destinationChainSelector,
                message
            );
        }

        emit MessageSent(messageId);
    }

    function authorise(
        uint64 destinationChainSelector,
        address receiver,
        PayFeesIn payFeesIn,
        string memory _tokenURI,
        uint256 _maxSupply,
        string memory _metadataId
    ) external {
        require(_maxSupply > 0, "Initial Amount must be greater than zero");

        /*
        tokenOwnerCount += 1;
        tokenOwners[tokenOwnerCount] = msg.sender;

        // set the price
        tokens[tokenOwnerCount].price.asset = _priceAsset;
        tokens[tokenOwnerCount].price.tokenIdOrAmount = _priceTokenIdOrAmount;
        tokens[tokenOwnerCount].price.tokenType = _priceTokenType;

        // set other params
        tokens[tokenOwnerCount].maxSupply = _maxSupply;
        tokens[tokenOwnerCount].currentSupply = 0;
        tokens[tokenOwnerCount].metadataId = _metadataId;

        */

        /*
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature(
                "authoriseCCIP(address,string,uint8,address,uint256,uint256,string)",
                msg.sender,
                _tokenURI,
                _priceTokenType,
                _priceAsset,
                _priceTokenIdOrAmount,
                _maxSupply,
                _metadataId
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        */

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature(
                "authoriseCCIP(address,string,uint256,string)",
                msg.sender,
                "https://knn3-knexus.s3.us-west-2.amazonaws.com/287ee780-f04e-45b2-b876-7cc3742b40ce_16932966887461693296687735.json",
                10,
                "1222"
            ),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 20_000_000, strict: false})
            ),
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        if (payFeesIn == PayFeesIn.LINK) {
            // LinkTokenInterface(i_link).approve(i_router, fee);
            messageId = IRouterClient(i_router).ccipSend(
                destinationChainSelector,
                message
            );
        } else {
            messageId = IRouterClient(i_router).ccipSend{value: fee}(
                destinationChainSelector,
                message
            );
        }

        emit MessageSent(messageId);
    }
}
