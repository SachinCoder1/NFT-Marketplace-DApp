import React from "react";
import { ethers } from "ethers";
import Link from "next/link";

export default function Card({ nft, showBtn = true, onClick }) {
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
          <button
            onClick={onClick}
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Details
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
