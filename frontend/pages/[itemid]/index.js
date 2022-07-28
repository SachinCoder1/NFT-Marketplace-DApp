import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { nftAddress, nftMarketplaceAddress } from "../../config/networkAddress";
import NFTAbi from "../../abi/NFT.json";
import NFTMarketplaceAbi from "../../abi/NFTMarketplace.json";
import axios from "axios";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import BtnMain from "../../subcomponents/btns/BtnMain";
import { AiOutlineArrowRight } from "react-icons/ai";
import NftInfo from "../../components/nft-info/NftInfo";

export default function Itemid() {
  const router = useRouter();
  let { itemid } = router.query;

  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const loadNFT = async () => {
    setLoading(true);
    setIsPurchasing(true)
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
    console.log(data);

    const allData = async () => {
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
      console.log(item);
      setNftData(item);
    };
    allData();
    setLoading(false);
    setIsPurchasing(false)
  };

  const buyNFT = async (price, tokenId) => {
    setIsPurchasing(true)
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const nftMarketPlaceContract = new ethers.Contract(
      nftMarketplaceAddress,
      NFTMarketplaceAbi.abi,
      signer
    );

    let convertedPrice = ethers.utils.parseUnits(price.toString(), "ether");

    const transaction = await nftMarketPlaceContract.buyItem(
      nftAddress,
      tokenId,
      {
        value: convertedPrice,
      }
    );
    await transaction.wait();
    await router.push("/my-items");
    setIsPurchasing(false)
  };

  useEffect(() => {
    const load = async () => {
      if (router.query.itemid) await loadNFT();
    };
    load();
  }, [itemid]);

  return (
    <div>
      <NftInfo nftData={nftData}>
        <BtnMain
          text="Buy Now"
          icon={<AiOutlineArrowRight className="text-2xl" />}
          className="w-full"
          onClick={() => buyNFT(nftData.price.toString(), nftData.tokenId)}
          disabled={isPurchasing}
        />
      </NftInfo>
    </div>
  );
}
