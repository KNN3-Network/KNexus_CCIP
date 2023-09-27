// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./utils/NFT1155.sol";
import "./utils/NFT1155URIStorage.sol";

/**
 * @title KnexusItem
 */

contract KnexusItemCCIP is
    NFT1155,
    NFT1155URIStorage,
    ReentrancyGuard,
    Pausable
{
    using Address for address;
    using SafeERC20 for IERC20;

    enum Role {
        UNAUTHORIZED,
        ADMIN
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

    // maps to the owner of each token ID
    mapping(uint256 => address) public tokenOwners;
    uint256 public tokenOwnerCount;
    // token data
    mapping(uint256 => Token) public tokens;
    // ACL
    mapping(address => Role) private permissions;
    // treasury address
    address public treasuryAddress;
    // For the platform
    uint256 public platformFee;
    // maps to lock / unlock states
    mapping(uint256 => bool) public lockable;

    event Authorised(
        uint256 indexed tokenId,
        address indexed owner,
        Token token
    );

    event TokenOwnerSet(address indexed prevOwner, address indexed newOwner);

    event TokenPriceSet(uint256 indexed tokenId, Price price);

    event TreasurySet(
        address indexed prevTreasury,
        address indexed newTreasury
    );

    event PlatformFeeSet(
        uint256 indexed prevPlatformFee,
        uint256 indexed newPlatformFee
    );

    event Sold(
        address indexed owner,
        uint256 indexed tokenId,
        address indexed tokenAddress,
        uint256 amount,
        uint256 originAmount
    );

    event Lockable(uint256 indexed tokenId, bool indexed lockable);

    constructor() {
        treasuryAddress = _msgSender();

        permissions[_msgSender()] = Role.ADMIN;

        // Set fees
        platformFee = 0; // 0%
    }

    /// @notice check token price for the given token ID
    function tokenPrice(
        uint256 _tokenId
    ) external view returns (TokenType, address, uint256) {
        return (
            tokens[_tokenId].price.tokenType,
            tokens[_tokenId].price.asset,
            tokens[_tokenId].price.tokenIdOrAmount
        );
    }

    /// @notice check token's current supply for the given token ID
    function tokenSupply(uint256 _tokenId) external view returns (uint256) {
        return (tokens[_tokenId].currentSupply);
    }

    /// @notice check token's max supply for the given token ID
    function tokenMaxSupply(uint256 _tokenId) external view returns (uint256) {
        return (tokens[_tokenId].maxSupply);
    }

    function authoriseCCIP(
        address to,
        string memory _tokenURI,
        uint256 _maxSupply,
        string memory _metadataId
    ) external nonReentrant whenNotPaused {
        require(_maxSupply > 0, "Initial Amount must be greater than zero");

        tokenOwnerCount += 1;
        tokenOwners[tokenOwnerCount] = to;

        _setURI(tokenOwnerCount, _tokenURI);

        lockable[tokenOwnerCount] = false;

        // set the price
        tokens[tokenOwnerCount]
            .price
            .asset = 0xE3beEF8Ab41bC7eB0a234EdA1241f0a47d8d9026;
        tokens[tokenOwnerCount].price.tokenIdOrAmount = 0;
        tokens[tokenOwnerCount].price.tokenType = TokenType.ERC20;

        // set other params
        tokens[tokenOwnerCount].maxSupply = _maxSupply;
        tokens[tokenOwnerCount].currentSupply = 0;
        tokens[tokenOwnerCount].metadataId = _metadataId;

        emit Authorised(tokenOwnerCount, to, tokens[tokenOwnerCount]);
    }

    /// @notice set the token URI (only be called by the token owner)
    function setTokenURI(
        uint256 _tokenId,
        string memory _tokenURI
    ) external nonReentrant whenNotPaused {
        require(tokenOwners[_tokenId] == _msgSender(), "Not authorised to set");
        _setURI(_tokenId, _tokenURI);
    }

    /// @notice set the token price (only be called by the token owner)
    function setTokenPrice(
        uint256 _tokenId,
        TokenType _priceType,
        address _priceAsset,
        uint256 _priceTokenIdOrAmount
    ) external nonReentrant whenNotPaused {
        require(tokenOwners[_tokenId] == _msgSender(), "Not authorised to set");

        tokens[_tokenId].price.tokenType = _priceType;
        tokens[_tokenId].price.asset = _priceAsset;
        tokens[_tokenId].price.tokenIdOrAmount = _priceTokenIdOrAmount;

        emit TokenPriceSet(_tokenId, tokens[_tokenId].price);
    }

    /// @notice transfer token owner
    function transferTokenOwner(
        uint256 _tokenId,
        address _newOwnerAddress
    ) external nonReentrant whenNotPaused {
        require(
            tokenOwners[_tokenId] == _msgSender(),
            "Not authorised to transfer"
        );

        tokenOwners[_tokenId] = _newOwnerAddress;

        emit TokenOwnerSet(_msgSender(), _newOwnerAddress);
    }

    /// @notice mintCCIP tokens
    /// @param _tokenId token ID
    /// @param _value amount of the token to be minted
    /// @param _data aux data
    function mintCCIP(
        address to,
        uint256 _tokenId,
        uint256 _value,
        bytes memory _data
    ) external nonReentrant whenNotPaused {
        require(lockable[_tokenId] == false, "Not allow to be mint");

        require(
            tokens[_tokenId].maxSupply >=
                (tokens[_tokenId].currentSupply + _value),
            "Max Supply Exceeded"
        );

        tokens[_tokenId].currentSupply += _value;

        address priceAsset = tokens[_tokenId].price.asset;
        uint256 priceAmount = tokens[_tokenId].price.tokenIdOrAmount;

        require(
            tokens[_tokenId].price.tokenType == TokenType.ERC20,
            "PriceAsset must be ERC20"
        );

        // only one token is minted
        require(_value == 1, "Can only mint one");

        _mint(to, _tokenId, 1, _data);

        emit Sold(
            _msgSender(),
            _tokenId,
            priceAsset,
            tokens[_tokenId].price.tokenIdOrAmount,
            priceAmount
        );
    }

    /// @notice return the token URI
    /// @param tokenId token ID
    function uri(
        uint256 tokenId
    )
        public
        view
        virtual
        override(NFT1155, NFT1155URIStorage)
        returns (string memory)
    {
        return NFT1155URIStorage.uri(tokenId);
    }

    /// @notice lock the token to not be transfered
    /// @param tokenId token ID
    function lock(uint256 tokenId) public {
        require(
            tokenOwners[tokenId] == _msgSender() ||
                permissions[_msgSender()] == Role.ADMIN,
            "Not authorised to lock"
        );
        lockable[tokenId] = true;

        emit Lockable(tokenId, true);
    }

    /// @notice unlock the token
    /// @param tokenId token ID
    function unlock(uint256 tokenId) public {
        require(
            tokenOwners[tokenId] == _msgSender() ||
                permissions[_msgSender()] == Role.ADMIN,
            "Not authorised to unlock"
        );
        lockable[tokenId] = false;

        emit Lockable(tokenId, false);
    }

    // update dev address
    function setTreasuryAddress(address _treasuryAddress) external onlyAdmin {
        address prevTreasuryFee = treasuryAddress;
        treasuryAddress = _treasuryAddress;

        emit TreasurySet(prevTreasuryFee, treasuryAddress);
    }

    // update fees
    function setFees(uint256 _platformFee) external onlyAdmin {
        uint256 prevPlatformFee = platformFee;
        platformFee = _platformFee;

        emit PlatformFeeSet(prevPlatformFee, platformFee);
    }

    // give a specific permission to the given address
    function grant(address _address, Role _role) external onlyAdmin {
        require(_address != _msgSender(), "You cannot grant yourself");
        permissions[_address] = _role;
    }

    // remove any permission binded to the given address
    function revoke(address _address) external onlyAdmin {
        require(_address != _msgSender(), "You cannot revoke yourself");
        permissions[_address] = Role.UNAUTHORIZED;
    }

    function setPaused(bool _paused) external onlyAdmin {
        if (_paused) {
            _pause();
        } else {
            _unpause();
        }
    }

    // withdraw locked funds
    function withdrawErc20(
        address _tokenAddress,
        address _toAddress,
        uint256 _amount
    ) external nonReentrant onlyAdmin {
        IERC20(_tokenAddress).safeTransfer(_toAddress, _amount);
    }

    // widthdraw ETH
    function withdraw(
        address _toAddress,
        uint256 _amount
    ) external nonReentrant onlyAdmin {
        (bool sent, ) = _toAddress.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    /// @notice burn tokens
    /// @param owner owner of the token
    /// @param id token ID
    /// @param value amount of the token to be burned
    function burn(
        address owner,
        uint256 id,
        uint256 value
    ) external nonReentrant whenNotPaused {
        require(
            owner == _msgSender() || isApprovedForAll(owner, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );

        _burn(owner, id, value);
    }

    modifier onlyAdmin() {
        require(
            permissions[_msgSender()] == Role.ADMIN,
            "Caller is not the admin"
        );
        _;
    }

    receive() external payable {}

    fallback() external payable {}
}
