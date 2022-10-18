# Scout-Protocol-Mainnet
https://scoutprotocol.xyz

A tool made to improve the experience of transferring crypto...

[INSERT LINK TO TUTORIAL]

## Overview

Scout is an first of its kind intuitive, decentralized platform to improve the experience of transferring cryptocurrency. Scout is completely peer to peer meaning contracts never hold custody of user's coins. Anyone can connect to and use Scout without ever having to hand over control of their funds.

Scout has a suite of built in features to improve transparency and security when sending funds. This include a novel public key system where users can set a pin as a second form of verification for users sending crypto to their address. Scout also provides an in-built contact system, as well as messaging and gifs on the blockchain! 

All optional of course for the anons out there ;) 

<b>No kyc/personal information required or collected!<b>

## Awards
Scout won 1st place in the first ever [MEGA Hackathon](https://www.megahackathon.com/#Feature6_0) sponsored by Polygon and Solana!

![I won?!](./readme_images/mega.png)

MEGA hackathon was the first ever student run blockchain hackathon and was put on by top tier Universities including Northwestern, USC, and UChicago. MEGA hackathon also partnered with blockchain groups all across the world including the Oxford Blockchain Society, Carnegie Mellon Blockchain Group, and Georgia Tech Blockchain group.


![MEGA Hackathon Sponsors](./readme_images/hackathon_sponsors.png)

## Feature Overview

 * Entirely peer-to-peer
  * Scout's contract NEVER has control of users coins

    ![p-2-p transactions](./readme_images/p2p.png)

* Pin security
  * Public pin confirmation system

    ![pin](./readme_images/pin.png)
  
* Contact system
  * Autofill addresses of common contacts

    ![contact system](./readme_images/contacts.png)
  
 * Built in messaging, gifs, and timestamps

  * ![fun features](./readme_images/transactions.png)
  
 * Supports ETH, MATIC, and USDC and is compatible with ALL erc20 tokens and EVM chains

  ![compatible](./readme_images/compatible.png)
  
 * Integrates seamlessly with metamask
 * Free to use!!!


## Getting started
1. Clone repo
2. make sure to install vite and hardhat


Running locally
change into the client directory
run the following command
    ```npm run dev```

    
## Deployment to a network
In the hardhat config file enter your alchemy api key and private key from your wallet (***DO NOT PUBLISH THIS TO GITHUB!). If you are deploying to a different network make sure to change the network nname to the desired chain (ie goerli, rinkeby, etc).

change directories into smart_contract 
run the following command (replacing desired_network with your network of choice)
  ```npx hardhat run scripts/deploy.js --network [DESIRED_NETWORK]```


## Adding additional ERC20 tokens
additional erc20 tokens can be added through the following process:

  a. find the address of the token on the desired network 
  
  I highly reccomend using [Uniswap's token lists] (https://tokenlists.org/) to find the official addresses
    

## Useful Libraries
[Vite](https://vitejs.dev/) -> for frontend tooling

[MUI](https://mui.com/) -> for autocomplete feature

[Notiflix](https://notiflix.github.io/) -> for creating popup notifications and confirmations

## Huge shoutout...
I wanted to thank JSMastery for [this fantastic tutorial](https://www.youtube.com/watch?v=Wn_Kb3MR_cU&list=PLoclJQ4TxDnBgL_WQmYpN7OcIAiYRkJCt&index=4) that has provided some of the css and basic functionality that is the backbone of Scout. However, I believe I went above and beyond to turn a simple application into a innovative tool with a multitude of features. With that being said... I'd love for you to clone this repo and make your own improvements! There is so much more you can add including (but not limited to) expanding to other EVM networks and adding more erc20 tokens (see above). 

I hope somewhere out there this project makes a difference. Whether it is saving you from a typo or inspiring you to fork my design, I hope that Scout shows you a way forward towards a better world...






