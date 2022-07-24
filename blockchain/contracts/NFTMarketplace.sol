// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/* Imports */
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/* Errors */

error NFTMarketplace__ItemPriceIsLessThenZero();
error NFTMarketplace__ItemPriceNotMet();

contract NFTMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private s_nftIds;
    Counters.Counter private s_nftSold;

    address payable private owner;
    uint256 listingPrice = 0.025 ether;

    /* Constructor */
    constructor() {
        owner = payable(msg.sender);
    }

    /* Structs */

    struct Item {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    /* Mappings */
    mapping(uint256 => Item) private Items;

    /* Events */

    event ItemList(
        uint256 indexed itemId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    /* Logics */

    function listItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) public payable nonReentrant {
        if (_price < 0) {
            revert NFTMarketplace__ItemPriceIsLessThenZero();
        }

        s_nftIds.increment();
        uint256 newNftId = s_nftIds.current();

        Items[newNftId] = Item(
            newNftId,
            _nftAddress,
            _tokenId,
            payable(msg.sender),
            payable(address(0)),
            _price,
            false
        );

        IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);

        emit ItemList(
            newNftId,
            _nftAddress,
            _tokenId,
            msg.sender,
            address(0),
            _price,
            false
        );
    }

}
