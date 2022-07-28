import React from "react";
import { ethers } from "ethers";
import Link from "next/link";
import {AiOutlineArrowRight} from 'react-icons/ai'
import { useRouter } from 'next/router';
import BtnMain from './../btns/BtnMain';

export default function Card({ nft, url="/" }) {
  const router = useRouter();
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg">
        <Link href={`${url}${nft.tokenId}`}>
        <img className="rounded-t-lg cursor-pointer object-cover  w-96 h-72" src={nft.image} alt={nft.name} />
        </Link>
      <div className="p-5">
          <h5 className="mb-3 text-2xl font-bold tracking-tight text-sky-600">
            {nft.name}
          </h5>
        <p className="mb-3 h-20 font-normal text-gray-600">{nft.description}</p>
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-sky-800">
          {nft.price.toString()} ETH
        </h5>
          <BtnMain
          text="View More"
          icon={<AiOutlineArrowRight className="text-2xl" />}
          className="w-full"
          onClick={() => router.push(`${url}${nft.tokenId}`)}
        />
      </div>
    </div>
















    // Anothrt Navbar

   
  );
}
