import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { nftAddress, nftMarketplaceAddress } from "../../config/networkAddress";
import NFTAbi from "../../abi/NFT.json";
import NFTMarketplaceAbi from "../../abi/NFTMarketplace.json";
import axios from "axios";
import Web3Modal from "web3modal";
import Card from "../../subcomponents/cards/Card";
import { useRouter } from "next/router";
import Heading2 from "../../subcomponents/headings/Heading2";

export default function AllNFTs() {
  const router = useRouter();
  const [allNFTs, setAllNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

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
    console.log(allNFTs);
    setLoading(false);
  };

  const buyNFT = async (nft) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const nftMarketPlaceContract = new ethers.Contract(
      nftMarketplaceAddress,
      NFTMarketplaceAbi.abi,
      signer
    );

    let convertedPrice = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const transaction = await nftMarketPlaceContract.buyItem(
      nftAddress,
      nft.tokenId,
      {
        value: convertedPrice,
      }
    );
    await transaction.wait();
    await loadAllNFTs();
  };

  useEffect(() => {
    const load = async () => {
      await loadAllNFTs();
      console.log(allNFTs);
    };
    load();
  }, []);

  return (
    <div>
      <div>
        {allNFTs.length && !loading ? (
          allNFTs?.map((nft, index) => (
            <div id={index}>
              <Card
                nft={nft}
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
    </div>
  );
}
