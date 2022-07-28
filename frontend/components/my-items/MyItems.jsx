import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { nftAddress, nftMarketplaceAddress } from "../../config/networkAddress";
import NFTAbi from "../../abi/NFT.json";
import NFTMarketplaceAbi from "../../abi/NFTMarketplace.json";
import axios from "axios";
import Web3Modal from "web3modal";
import Card from "../../subcomponents/cards/Card";
import Link from 'next/link'
import Loading from "../../subcomponents/loading/Loading";

export default function MyItems() {
  const [allNFTs, setAllNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Only loads the NFTs which are purchased by the user.
  const loadMyNFTs = async () => {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(nftAddress, NFTAbi.abi, signer);
    const nftMarketPlaceContract = new ethers.Contract(
      nftMarketplaceAddress,
      NFTMarketplaceAbi.abi,
      signer
    );
    
    const data = await nftMarketPlaceContract.getOwnerListedItems();

    const allItems = await Promise.all(
      data?.map(async (i) => {
        let convertedPrice = ethers.utils.formatUnits(
          i.price.toString(),
          "ether"
        );
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const metaData = await axios.get(tokenUri);
        let item = {
          price: convertedPrice,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: metaData.data.image,
          name: metaData.data.name,
          description: metaData.data.description,
        };
        return item;
      })
    );
    setAllNFTs(allItems);
    console.log(allNFTs);
    setLoading(false);
  };

  useEffect(() => {
    const load = async () => {
      await loadMyNFTs();
      console.log(allNFTs);
    };
    load();
  }, []);
  return (
    <div>
       {!allNFTs.length && loading ? (
        <Loading />
      ) : (
      <div>
        {allNFTs.length && !loading ? (
          allNFTs?.map((nft, index) => (
            <div key={index}>
              <Card
                nft={nft}
                url="/my-items/"
                onClick={() =>  buyNFT(nft)}
              />
            </div>
          ))
        ) : (
          <div className="text-center font-semibold text-base">
            No purchase History found.
            <Link href="/">Buy Now some</Link>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
