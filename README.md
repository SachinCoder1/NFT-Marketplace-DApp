# FullStack-NFT-Marketplace-DApp

Complete Full Stack NFT Marketplace (Decentralized Application) using solidity language, hardhat, and next.js framework for frontend. 

## Functionalities :-
 - See **All Listed NFTs** without doing Login.
 - **Buy a NFT**.
 - **List a NFT** just by putting image, name, description, price.
 - See your **Owned NFTs** (Your purchased NFTs)
 - See **Your Listed NFTs** and NFts you have sold.
 - Good UI

_Smart Contract Deployed on **Rinkeby Test Network**_ -> Not deployed at

**_Check It at_** -> Not deployed at **(Deployed on fleek (IPFS)**

_Check Smart Contract At_ -> Not deployed yet.





## How to Setup in your local enviroment :-

### Frontend 
    1. cd frontend
    2. yarn
    3. yarn run dev


### Blockchain
    1. cd blockchain
    2. yarn
    3. setup env
    4. yarn hardhat test || npx hardhat test
    5. yarn hardhat run scripts/deploy.js --network localhost
    
    
    
## Technologies/Frameworks Used :-

### Frontend
1. **Next.js**
2. **Tailwind CSS** (For styling)
3. **ethers.js** For integration of blockchain


## Blockchain
1. **Solidity** (To develop Smart Contract)
2. **Javascript** (For deploying scripts)
3. **Chai** (For testing Smart Contract)
4. **Openzeppelin** For minting NFT
5. **Hardhat**