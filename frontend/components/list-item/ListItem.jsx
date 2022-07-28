import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { nftAddress, nftMarketplaceAddress } from "../../config/networkAddress";
import NFTAbi from "../../abi/NFT.json";
import NFTMarketplaceAbi from "../../abi/NFTMarketplace.json";
import Input from "../../subcomponents/inputs/Input";
import { AiOutlineArrowUp } from "react-icons/ai";
import BtnMain from "../../subcomponents/btns/BtnMain";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function ListItem() {
  const router = useRouter();
  const [isListing, setisListing] = useState(false);
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    price: "",
    name: "",
    description: "",
  });

  // Onchange of image file
  const onChange = async (e) => {
    const fileData = e.target.files[0];
    try {
      const add = await client.add(fileData, {
        progress: (prog) => console.log("Image is uploaded : ", prog),
      });
      const url = `https://ipfs.infura.io/ipfs/${add.path}`;
      setFile(url);
    } catch (error) {
      console.log(
        "Error in onChange function , You are in catch of ListItem component ",
        error
      );
    }
  };

  // Main function to list an item. First it mint an NFT and then List an nft.
  const createItem = async (url) => {
    setisListing(true)
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftAddress, NFTAbi.abi, signer);

    let transaction = await nftContract.mintToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    let convertedPrice = ethers.utils.parseUnits(formData.price, "ether");
    const nftMarketPlaceContract = new ethers.Contract(
      nftMarketplaceAddress,
      NFTMarketplaceAbi.abi,
      signer
    );

    const listingPrice = await nftMarketPlaceContract.getListingPrice();
    listingPrice = await listingPrice.toString();
    let listingTx = await nftMarketPlaceContract.listItem(
      nftAddress,
      tokenId,
      convertedPrice,
      { value: listingPrice }
    );
    await listingTx.wait();
    
    router.push("/");
    setisListing(false)
  };

  const listAnItem = async () => {
    setisListing(true)
    const { name, price, description } = formData;
    if (!name || !price || !description || !file) {
      console.log("Some feild are missing");
      setisListing(false)
      return;
    }

    const data = JSON.stringify({ name, description, image: file });
    try {
      const add = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${add.path}`;
      createItem(url);
    } catch (error) {
      console.log(
        "Error in listAnItem function , You are in catch of listAnItem function ",
        error
      );
    }
  };

  return (
    <div className="flex justify-center">
      <div className="md:w-3/6">
        <form action="">
          <Input
            id="name"
            placeholder="e.g.Monkey"
            label="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </form>
        <Input
          id="description"
          placeholder="e.g.This is most unique monkey in the world."
          label="Description"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Input
          id="price"
          placeholder="e.g.10 (In Ether)"
          label="Price"
          onChange={(e) => {
            console.log(formData.price);
            setFormData({ ...formData, price: e.target.value });
            console.log(formData);
          }}
        />
        <Input
          id="file"
          placeholder="Choose image file"
          label="NFT Image"
          type="file"
          onChange={onChange}
        />
        <div className="">
          {file && (
            <img
              className="rounded-xl mt-4 mb-10 w-96"
              src={file}
              alt="Choosen image"
            />
          )}
        </div>
          <BtnMain
            text="List NFT"
            icon={<AiOutlineArrowUp className="text-2xl" />}
            className="w-full text-lg"
            onClick={listAnItem}
            disabled={isListing}
          />
      </div>
    </div>
  );
}
