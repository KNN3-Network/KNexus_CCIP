// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KnexusCCIP is ERC721, ERC721URIStorage, Ownable {
    constructor() ERC721("KNexus_Test_img", "KNTEST") {}

    string constant TOKEN_URI =
        "ipfs://bafkreihrylz2yk2ujarbucmki523kitlohdzr45nqdmfqfn6cne2aizspe";
    uint256 internal _tokenId;

    mapping(address => bool) internal _dispatcherlisted;

    event DispatcherlistedChanged(
        address indexed dispatcher,
        bool indexed whitelisted,
        uint256 timestamp
    );

    modifier onlyDispatcher() {
        require(_dispatcherlisted[msg.sender], "not permission");
        _;
    }

    function isDispatcherlisted(
        address dispatcher
    ) external view returns (bool) {
        return _dispatcherlisted[dispatcher];
    }

    function dispatcherlistedCreator(
        address dispatcher,
        bool whitelist
    ) external onlyOwner {
        _dispatcherlisted[dispatcher] = whitelist;
        emit DispatcherlistedChanged(dispatcher, whitelist, block.timestamp);
    }

    // function ccipMint(address to) public onlyDispatcher {
    //     _safeMint(to, _tokenId);
    //     _setTokenURI(_tokenId, TOKEN_URI);
    //     unchecked {
    //         _tokenId++;
    //     }
    // }

    function mint(address to) public {
        _safeMint(to, _tokenId);
        _setTokenURI(_tokenId, TOKEN_URI);
        unchecked {
            _tokenId++;
        }
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        require(from == address(0), "Token is not transferable");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
