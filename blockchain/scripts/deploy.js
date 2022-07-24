const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.deployed();
  console.log("nftMarketplace deployed to:", nftMarketplace.address);

  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(nftMarketplace.address);
  await nft.deployed();
  console.log("nft deployed to:", nft.address);
  
  fs.writeFileSync(
    "../frontend/config/networkAddress.js",
    `
  export const nftMarketplaceAddress = "${nftMarketplace.address}"
  export const nftAddress = "${nft.address}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
