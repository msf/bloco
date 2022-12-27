import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.7.6",
};


module.exports = {
    config: {
        accounts: [process.env.METAMASK_DOXXED_PRIVATE_KEY],
    },
    networks: {
        polygon: {
            url: process.env.WEB3_RPC_URL,
            accounts: [process.env.METAMASK_DOXXED_PRIVATE_KEY],
        },
    },
};

export default config;
