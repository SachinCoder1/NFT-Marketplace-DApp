import React, { useState } from "react";
import {ethers} from 'ethers'
import { nftAddress, nftMarketplaceAddress } from "../../config/networkAddress";
import NFTAbi from '../../abi/NFT.json';
import NFTMarketplaceAbi from '../../abi/NFTMarketplace.json';
import axios from 'axios';


export default function AllNFTs() {
  const [allNFTs, setAllNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllNFTs = async () => {
    setLoading(true)
    const provider = new ethers.providers.JsonRpcProvider();
    const nftContract = new ethers.Contract(nftAddress, NFTAbi.abi, provider );
    const nftMarketPlaceContract = new ethers.Contract(nftMarketplaceAddress, NFTMarketplaceAbi.abi, provider)
    const data = await nftMarketPlaceContract.getAllListedItems();

    const allItems = new Promise.all(data?.map(async i => {
      const tokenUri = await nftContract.tokenURI(i.tokenId);
      const metaData = await axios.get(tokenUri)
      let convertedPrice = ethers.utils.formatUnits(i.price.toString(), 'ether');
      let item = {
        price: convertedPrice,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: metaData.data.image,
        name: metaData.data.name,
        description: meta.data.description
      }
      return item;
    
    }))
    setAllNFTs(allItems);
    setLoading(false);
  }

  useEffect(() => {
    loadAllNFTs();
  }, []);

  return <div>AllNFTs</div>;
}
