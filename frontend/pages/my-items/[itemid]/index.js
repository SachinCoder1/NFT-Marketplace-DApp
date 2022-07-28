import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  nftAddress,
  nftMarketplaceAddress,
} from "../../../config/networkAddress";
import NFTAbi from "../../../abi/NFT.json";
import NFTMarketplaceAbi from "../../../abi/NFTMarketplace.json";
import axios from "axios";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import BtnMain from "../../../subcomponents/btns/BtnMain";
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import NftInfo from "../../../components/nft-info/NftInfo";
import Input from "../../../subcomponents/inputs/Input";

export default function MyItemId() {
  const router = useRouter();
  let { itemid } = router.query;

  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [resellPrice, setResellPrice] = useState("");
  const [isReselling, setIsReselling] = useState(false);
  const [isPurchasing, setisPurchasing] = useState(false);

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
  };

  const resellNFT = async (price, tokenId) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const nftMarketPlaceContract = new ethers.Contract(
      nftMarketplaceAddress,
      NFTMarketplaceAbi.abi,
      signer
    );

    let convertedPrice = ethers.utils.parseUnits(price, "ether");

    const listingPrice = await nftMarketPlaceContract.getListingPrice();
    listingPrice = await listingPrice.toString();
    // tokenId.toNumber();

    const transaction = await nftMarketPlaceContract.resellItem(
      nftAddress,
      tokenId,
      convertedPrice,
      {
        value: listingPrice,
      }
    );
    await transaction.wait();
    await router.push("/my-listed-items");
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
          text={isReselling ? "Cancel" : "ReSell NFT"}
          icon={<AiOutlineArrowRight className="text-2xl" />}
          className="bg-blue-500"
          onClick={() => setIsReselling(!isReselling)}
        />
        {isReselling && (
          <div>
            <Input
              id="resellprice"
              placeholder="e.g.10 (In Ether)"
              label="Resell Price"
              onChange={(e) => setResellPrice(e.target.value)}
            />
            <BtnMain
              text="List NFT"
              icon={<AiOutlineArrowUp className="text-2xl" />}
              className="text-lg w-full"
            //   onClick={() => alert("Feature Not Activated. Try Later ")}
            />
          </div>
        )}
      </NftInfo>
    </div>
  );
}
