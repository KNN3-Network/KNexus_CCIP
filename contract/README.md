
## Knexus CCIP




```
npx hardhat deploy-destination-minter --network polygonMumbai

ℹ️  Attempting to deploy MyNFT smart contract on the polygonMumbai blockchain using 0xD3420A3be0a1EFc0FBD13e87141c97B2C9AC9dD3 address
✅ MyNFT contract deployed at address 0xEFCA549833263eb624Cd94b4f42dd6EF0d34d0e0 on the polygonMumbai blockchain
ℹ️  Attempting to deploy DestinationMinter smart contract on the polygonMumbai blockchain using 0xD3420A3be0a1EFc0FBD13e87141c97B2C9AC9dD3 address, with the Router address 0x70499c328e1e2a3c41108bd3730f6670a44595d1 provided as constructor argument
✅ DestinationMinter contract deployed at address 0x1DcD208D120a55479eb41F6feCa61857f5A00D67 on the polygonMumbai blockchain
ℹ️  Attempting to grant the minter role to the DestinationMinter smart contract


npx hardhat deploy-source-minter --network bnbTestnet



ℹ️  Attempting to deploy SourceMinter smart contract on the bnbTestnet blockchain using 0xD3420A3be0a1EFc0FBD13e87141c97B2C9AC9dD3 address, with the Router address 0x70499c328e1e2a3c41108bd3730f6670a44595d1 and LINK address 0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06 provided as constructor arguments
✅ SourceMinter contract deployed at address 0x7604028b2667f4aa2bd02F6d23810126f3f57AeA on the bnbTestnet blockchain



npx hardhat fill-sender --sender-address 0x7604028b2667f4aa2bd02F6d23810126f3f57AeA --blockchain bnbTestnet --amount 100000000000000000 --pay-fees-in LINK

npx hardhat cross-chain-mint --source-minter 0x7604028b2667f4aa2bd02F6d23810126f3f57AeA --source-blockchain bnbTestnet --destination-blockchain polygonMumbai --destination-minter 0x1DcD208D120a55479eb41F6feCa61857f5A00D67 --pay-fees-in LINK



https://ccip.chain.link/
```