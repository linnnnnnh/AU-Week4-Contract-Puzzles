require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    hardhat: {
      accounts: {
        count: 200,
        // accountsBalance: 10000000000000000000000, // default value is 10000ETH in wei
      },
    },
  },
};
