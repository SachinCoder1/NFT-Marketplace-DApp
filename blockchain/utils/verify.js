// we can't have these functions in our `helper-hardhat-config`
// since these use the hardhat library
// and it would be a circular dependency
const { run } = require("hardhat")

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    try {
        if(args){
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: args,
            })
        }else{
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: [],
            })

        }
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log("You are in else part of verify", e)
        }
    }
}

module.exports = {
    verify,
}