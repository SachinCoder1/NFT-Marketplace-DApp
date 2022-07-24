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
        uint itemId;
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
        uint indexed itemId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    /* Logics */

    function getListingPrice() external view returns(uint256) {
        return listingPrice;
    }

    // Get all Listed Items
    function getAllListedItems() external view returns (Item[] memory) {
        uint itemCount = s_nftIds.current();
        uint unSoldItemsCount = s_nftIds.current() - s_nftSold.current();
        uint currentIndex = 0;

        Item[] memory items = new Item[](unSoldItemsCount);
        for (uint i = 0; i < itemCount; i++) {
            if (Items[i + 1].owner == address(0)) {
                uint currentId = Items[i + 1].itemId;
                Item storage currentItem = Items[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    // Get Items of the owner who have purchased the items;
    function getOwnerListedItems() external view returns (Item[] memory) {
        uint totalListedItems = s_nftIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint256 i = 0; i < totalListedItems; i++) {
            if (Items[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        Item[] memory items = new Item[](itemCount);
        for (uint i = 0; i < totalListedItems; i++) {
            if (Items[i + 1].owner == msg.sender) {
                uint currentId = Items[i + 1].itemId;
                Item storage currentItem = Items[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    // Get Items of the seller who have listed items;
    function getSellerListedItems() external view returns (Item[] memory) {
        uint totalListedItems = s_nftIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint256 i = 0; i < totalListedItems; i++) {
            if (Items[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        Item[] memory items = new Item[](itemCount);
        for (uint i = 0; i < totalListedItems; i++) {
            if (Items[i + 1].seller == msg.sender) {
                uint currentId = Items[i + 1].itemId;
                Item storage currentItem = Items[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }


// List a item;
    function listItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) public payable nonReentrant {
        if (_price < 0) {
            revert NFTMarketplace__ItemPriceIsLessThenZero();
        }

        s_nftIds.increment();
        uint newNftId = s_nftIds.current();

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

    // Buy Item
    function buyItem(address _nftAddress, uint256 _itemId)
        external
        payable
        nonReentrant
    {
        uint256 price = Items[_itemId].price;
        uint256 tokenId = Items[_itemId].tokenId;
        address payable seller = Items[_itemId].seller;
        if (msg.value != price) {
            revert NFTMarketplace__ItemPriceNotMet();
        }

        // Items[_itemId].seller.transfer(msg.value);
        seller.transfer(msg.value);
        IERC721(_nftAddress).transferFrom(address(this), msg.sender, tokenId);
        Items[_itemId].owner = payable(msg.sender);
        Items[_itemId].sold = true;
        s_nftSold.increment();
        payable(owner).transfer(listingPrice);
    }
}
