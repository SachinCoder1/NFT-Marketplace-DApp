import React from "react";
import { ethers } from "ethers";
import Link from "next/link";
import {AiOutlineArrowRight} from 'react-icons/ai'
import { useRouter } from 'next/router';

export default function Card({ nft, showBtn = true, onClick }) {
  const router = useRouter();
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md shadow-gray-400">
        <Link href={`/${nft.tokenId}`}>
        <img className="rounded-t-lg cursor-pointer" src={nft.image} alt={nft.name} />
        </Link>
      <div className="p-5">
          <h5 className="mb-3 text-2xl font-bold tracking-tight text-sky-600">
            {nft.name}
          </h5>
        <p className="mb-3 font-normal text-gray-600">{nft.description}</p>
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-sky-800">
          {nft.price.toString()} ETH
        </h5>
        {showBtn && (
          <BtnMain
          text="View More"
          icon={<AiOutlineArrowRight className="text-2xl" />}
          className="w-full"
          onClick={() => router.push(`/${nft.tokenId}`)}
        />
        )}
      </div>
    </div>
















    // Anothrt Navbar

   
  );
}