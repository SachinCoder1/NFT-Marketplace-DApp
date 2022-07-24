// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


/* Imports */
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {

    /* State Variables */


    using Counters for Counters.Counter;
    Counters.Counter private s_tokenIds; 
    address s_marketplaceAddress;

    constructor(address _marketplaceAddress) ERC721("MyFirstNFT", "nft") {
     s_marketplaceAddress = _marketplaceAddress;
    }


    /*  Logics */

    function mintToken(string memory _tokenURI) external returns (uint) {
        s_tokenIds.increment();
        uint256 newTokenId = s_tokenIds.current();

        _mint(msg.sender, newTokenId);

        _setTokenURI(newTokenId, _tokenURI);

        setApprovalForAll(s_marketplaceAddress, true);
        return newTokenId;
    }



 
}