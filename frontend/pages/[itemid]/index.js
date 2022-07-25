import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { nftAddress, nftMarketplaceAddress } from "../../config/networkAddress";
import NFTAbi from "../../abi/NFT.json";
import NFTMarketplaceAbi from "../../abi/NFTMarketplace.json";
import axios from "axios";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import MainLayout from "./../../components/layouts/MainLayout";

export default function itemid() {
  const router = useRouter();
  let { itemid } = router.query;

  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState();

  const loadNFT = async () => {
    setLoading(true);
    const provider = new ethers.providers.JsonRpcProvider();
    const nftContract = new ethers.Contract(nftAddress, NFTAbi.abi, provider);
    const nftMarketPlaceContract = new ethers.Contract(
      nftMarketplaceAddress,
      NFTMarketplaceAbi.abi,
      provider
    );
    const data = await nftMarketPlaceContract.getPerticularItem(
      router.query.itemid
    );
    console.log(data)

    const allData =  async () => {
    let convertedPrice = ethers.utils.formatUnits(
          data.price.toString(),
          "ether"
        );
        const tokenUri = await nftContract.tokenURI(data.tokenId);
        const metaData = await axios.get(tokenUri);
        let item = {
          price: convertedPrice,
          tokenId: data.tokenId.toNumber(),
          seller: data.seller,
          owner: data.owner,
          image: metaData.data.image,
          name: metaData.data.name,
          description: metaData.data.description,
        };
        console.log(item)
        setNftData(item)
    }
    allData();
    //   })
    // );
    // setNftData(allData());
    // console.log(allData);
    setLoading(false);
  };

  useEffect(() => {
    const load = async () => {
        if(router.query.itemid)
      await loadNFT();
      //   console.log(allNFTs);
    };
    load();
  }, []);

  return (
    <MainLayout>
      Hi there you are on {itemid}
      <div>Hey how are you {nftData?.name}</div>
    </MainLayout>
  );
}
