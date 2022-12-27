// Import the contract ABI and bytecode.
import { abi, bytecode } from "../contracts/Swap.json";

// Import the expect library for assertions.
import { expect } from "chai";

// Import the Hardhat libraries for testing.
import {
  constants,
  ethers,
  expectRevert,
  getWallets,
  getContractFactory,
  solidity
} from "hardhat";

// Import the Uniswap v3 swap router ABI.
import { routerAbi } from "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.json";

// Import the polygon addresses for WETH and USDC.
import { WETH9, USDC } from "./addresses";

describe("SimpleSwap", function () {
  // This variable will hold the contract instance.
  let simpleSwap;

  // This variable will hold the Uniswap v3 swap router instance.
  let swapRouter;

  // These variables will hold the test wallet addresses.
  let user, user2;

  // This variable will hold the contract factory.
  let factory;

  // This variable will hold the contract deployment parameters.
  let params;

  // This variable will hold the amount of USDC to use for the swap.
  let amountIn;

  // This variable will hold the amount of WETH9 received from the swap.
  let amountOut;

  // This variable will hold the contract address after deployment.
  let contractAddress;

  // Define the contract name and wallet addresses for the test.
  before(async function () {
    this.timeout(300000);
    [user, user2] = await getWallets();
    factory = await getContractFactory("SimpleSwap");
    amountIn = ethers.utils.parseUnits("10", 6);
  });

  // Deploy the contract and initialize the swap router.
  beforeEach(async function () {
    this.timeout(300000);
    // Deploy the contract.
    simpleSwap = await factory.deploy();
    contractAddress = simpleSwap.address;
    // Instantiate the Uniswap v3 swap router.
    swapRouter = await new ethers.Contract(
      constants.KOVAN_UNISWAP_V3_ROUTER_ADDRESS,
      routerAbi,
      user2
    );
    // Set the swap router on the contract.
    await simpleSwap.functions.init(constants.KOVAN_UNISWAP_V3_ROUTER_ADDRESS);
    // Approve the swap router to spend the USDC on behalf of the user.
    await swapRouter.functions.addLiquidityETH(
      USDC.toLowerCase(),
      amountIn,
      amountIn,
      amountIn,
      user,
      constants.MAX_UINT256,
      user
    );
    // Transfer the USDC to the user.
    await simpleSwap.functions.transfer(user, amountIn, {
      value: 0,
      gasPrice: 0
    });
  });

  // Test the swap function.
