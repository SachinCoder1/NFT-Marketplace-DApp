import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { nftAddress, nftMarketplaceAddress } from "../../config/networkAddress";
import NFTAbi from "../../abi/NFT.json";
import NFTMarketplaceAbi from "../../abi/NFTMarketplace.json";
import axios from "axios";
import Card from "../../subcomponents/cards/Card";
import { useRouter } from "next/router";
import Loading from "../../subcomponents/loading/Loading";

export default function AllNFTs() {
  const router = useRouter();
  const [allNFTs, setAllNFTs] = useState([]);
  const [loading, setLoading] = useState(false);


  // Function to load all nfts (Dosen't require authentication)
  const loadAllNFTs = async () => {
    setLoading(true);
    const provider = new ethers.providers.JsonRpcProvider();
    const nftContract = new ethers.Contract(nftAddress, NFTAbi.abi, provider);
    const nftMarketPlaceContract = new ethers.Contract(
      nftMarketplaceAddress,
      NFTMarketplaceAbi.abi,
      provider
    );
    const data = await nftMarketPlaceContract.getAllListedItems();

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
    setLoading(false);
  };


  useEffect(() => {
    const load = () => {
      loadAllNFTs();
    };
    load();
  }, []);

  return (
    <div>
      {loading == true ? (
        <Loading />
      ) : (
      <div>
        {allNFTs.length && !loading ? (
          allNFTs?.map((nft, index) => (
            <div key={index}>
              <Card
                nft={nft}
                url=""
                onClick={() => {
                  // buyNFT(nft);
                  router.push(`/${nft.tokenId}`)
                  console.log("Onclicked on buy button.");
                }}
              />
            </div>
          ))
        ) : (
          <div className="text-center font-semibold text-base">
            No NFTs found
          </div>
        )}
      </div>
       )}
    </div>
  );
}
