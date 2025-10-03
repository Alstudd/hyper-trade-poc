require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
    "hyperevm-testnet": {
      url:
        process.env.HYPEREVM_RPC_URL ||
        "https://rpc.hyperliquid-testnet.xyz/evm",
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
      chainId: 998,
      timeout: 60000,
      gas: "auto",
      gasPrice: "auto",
    },
    "arbitrum-sepolia": {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
      chainId: 421614,
      timeout: 60000,
    },
  },
  etherscan: {
    apiKey: {
      "hyperevm-testnet": "",
      "arbitrum-sepolia": process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "hyperevm-testnet",
        chainId: 998,
        urls: {
          apiURL: "https://rpc.hyperliquid-testnet.xyz/evm",
          browserURL: "https://app.hyperliquid-testnet.xyz/explorer",
        },
      },
    ],
  },
};
