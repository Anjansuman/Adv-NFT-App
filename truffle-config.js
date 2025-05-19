require("dotenv").config()

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gas: 6721975,
      gasPrice: 20000000000
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          [process.env.PRIVATE_KEY],
          `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
        ),
      network_id: 11155111, // Sepolia
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  compilers: {
    solc: {
      version: "0.8.10",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
