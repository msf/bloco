import {
    constants,
    ethers
} from "hardhat";

import {
    Contract,
    Wallet
} from "@ethersproject/contracts";


async function main() {

  const POLYGON_NETWORK_ID = 137;
    // Set up the provider to connect to the Polygon network
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.WEB3_RPC_URL,
    POLYGON_NETWORK_ID
  );
  // Create a wallet from the private key
  const wallet = new Wallet(process.env.METAMASK_DOXXED_PRIVATE_KEY);

    const factory = await ethers.getContractFactory("SimpleSwap");
    // Define the contract deployment parameters.
    const swapRouter = await ethers.GetContractAt("SwapRouter", 0xE592427A0AEce92De3Edee1F18E0157C05861564)
    const params = {
        // Set the Uniswap v3 swap router address.
        _swapRouter: swapRouter
    };
    const sswap = await factory.deploy(params);

    await sswap.deployed();

    it("should deploy the contract", async function () {
        expect(sswap.address).to.not.be.null;
    });
    console.log(`SimpleSwap (USDC -> WETH9) deployed to ${sswap.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
