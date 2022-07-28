const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Started deploying NFT Contract ------------------------------------");


  const nftMarketplaceContract = await ethers.getContract(
    "NFTMarketplace"
  );
  const nftMarketplaceAddress = await nftMarketplaceContract.address;


  const args = [nftMarketplaceAddress];
  const nft = await deploy("NFT", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying-----------------------------------------");
    await verify(nft.address, args);
  }

  log(
    "Deployment Done --------------------------------------------------",
    "NFT Contract address is : ",
    nft.address
  );
};

module.exports.tags = ["all", "nft", "main"];

// const {network} = require('hardhat');
// const {developmentChains} = require('../helper-hardhat-config');
// const {verify} = require('../utils/verify');

// module.exports = async ({getNamedAccounts, deployments}) => {
//     const {deploy, log} = deployments;
//     const {deployer} = await getNamedAccounts();
//     log("Started deploying basicNFT ------------------------------------");

//     const args = [];
//     const basicNFT = await deploy("BasicNFT", {
//         from: deployer,
//         args: args,
//         log: true,
//         waitConfirmations: network.config.blockConfirmations || 1,
//     })

//     if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
//         log("Verifying-----------------------------------------");
//         await verify(basicNFT.address, arguments);

//     }

//     log("Done --------------------------------------------------")

// }

// module.exports.tags = ["all", "basicnft", "main"]
