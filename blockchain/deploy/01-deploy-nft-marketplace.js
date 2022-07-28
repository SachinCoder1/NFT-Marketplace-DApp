const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("Started deploying NFT Contract ------------------------------------");

  const args = [];
  const nftMarketplace = await deploy("NFTMarketplace", {
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
    await verify(nftMarketplace.address);
  }

  log(
    "Deployment Done --------------------------------------------------",
    "NFT Marketplace Contract address is : ",
    nftMarketplace.address
  );
};

module.exports.tags = ["all", "nftmarketplace", "main"];

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
