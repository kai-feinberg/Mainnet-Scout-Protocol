
require ('@nomiclabs/hardhat-waffle');
module.exports = {
  solidity: '0.8.0',
  networks: {
    ethereum: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY',
      accounts: ['YOUR_PRIVATE_KEY'],
    }
  }
}


