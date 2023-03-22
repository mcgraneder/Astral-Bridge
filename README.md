# Astral Bridge
the ideas seen in the Astral contracts are inspired from the bridge flow hat the Ren protocol uses. That is when a user wants to move asset A from blockchain X to blockchain Y, the orgignal Asset A is locked up in a vault. then once a few security paraeteres have been met (explained below) we can mint a ERC-20 synthetic version of the original token on the destination chain with a 1:1 peg. Since i am building this solo and for hobby astral assets do no refleect ther counterpart. but in such a scenario luiquidty would be provided to make sure that the synth assets has a peg to th real ones

# astral bridge breakdown
The bridge works like a commoon factory. there is a registry of suppportted assets that astral supports.From here we have a duplicate smart contrac bindings. Each Astral asset will have its own native address and bridge address associated with itself. people can query the state of this at any to get information on the the token being bridged or released. Below is a high level overview of the contract structure

![image](https://user-images.githubusercontent.com/40043037/226329758-69839eca-daaf-4220-aaa0-bdfd4ec58b52.png)

Each Astral asset deploys its own ERC20 instance and bridge instance. One thing not encapsulated in the above graph is the idea of a registry. The bridge factory acts like a resgitry to keep track of which assets the system supports and offer easy lookups for the proprties of those assets such as asset symbols and addresses. One goal of the factory therefore is to determine based on the type of asset being interacted with, whether we are dealing with a lock/mint bridge flow or a burn/release bridge flow. the former is for whenever a user has a chain native asset that they wish to bridge to some new chain and the latter is when a user wants to redeem there nrewly bridged astral assets for its native counterpart.

Users can execute nested bridges in this system also. For example. Lets say ALICEs moves 10 USDT from EThereum to Binance. She locks up her 10 USDT on Ethereum and recieves 10 aUSDT on Binance. This works fine for a single bridge model where alice does whatever she wants with her aUSDT on binance and then burns it to redeem her original USDT on Ethereum. However things get more complicated if ALICE ends up wanting to bridge her aUSDT from Binance to Polygon. How would this work in terms of keeping track of the receipt of the original native USDT asset lock.

We can made an alternate flow in the lock/mint flow where if the asset being locked is both a synthetic astralAsset on supported by the bridge factory. If so then in the lock flow when ALICE moves aUSDT from binance to Polygon instead of locking the asset we just modify her internal state balance by reducing it. this way no matter how many nested bridge operations take place, we can always assure that there is always the same amount of NATIVE_TOKEN: SYNTHETIC_TOKEN in the system

# Security
Users can execute cross chain transactions using astral api. howeveer how safe is it. Well ive only been building this out for a few weeks and the main build /contracs are not complete yet. right now there is a good bit of work i need to do on access control and upgradavle proxies. Currenty the system is not trustless as all of the verifcation and cross-chain communication relies on one signle "admin" private key. So users have to trust us to not have any malicious code etc. 

## Secure Multi-party Computation
To get around this painpoint we can introduc the concpept of seccure multiparty computation and shamirs secret sharing. This is also one of the main cryptogtaphic verification mehtods used by the REN_vm. I have a plan to implement langrange interpolation a little differently using a browser based model for nodes rather than trying to create my own layer1 and have real people do the computation nessecary to reconstruct secrets.

The first one is called Shamir Secret Sharing (SSS), which is simply about splitting the signing private key into n shares. Alice can then split the shares among her friends. When Alice wants to sign a transaction, she would then have to ask her friends to give her back the shares, that she can use to recreate the signing private key. Note that SSS has many many variants, for example VSSS allows participants to verify that malicious shares are not being used, and PSSS allows participants to proactively rotate their shares.

![image](https://user-images.githubusercontent.com/40043037/226336060-a47a6fff-67ab-4efc-82d5-b3660656f17e.png)

A logical next step is to change the system so that we mitigate the point of failuire when alice gets possession of all three shares (NOT TURSTLESS). This is, so that Alice cannot sign a transaction by herself. A multi-signature system (or multisig) would require n participants to sign the same transaction and send the n signatures to the system. This is much better, except for the fact that n signatures means that the transaction size increases linearly with the number of signers required.
But can do better: a multi-signature system with aggregated signatures. Signature schemes like BLS allow you to compress the n signatures in a single signature

Right now the astral bridge just uses the admin private key to use the ECDSA standard for verifying a mint or release transaction. However using the above shcheme we can implementd a more trustless model. Aso of now i have started working on an SMPC implementation in typescript that i will need to take time to develop as i am learning a lot of these concepts as i go. For now i will continue to update this repo as the smart contracts themselves develop, but until i develop a SMPC verification model this Bridge implementation will remain centralised.

# Astral Bridge

![Capture1](https://user-images.githubusercontent.com/40043037/223294939-bd7d5913-a859-483f-a6b7-4beda97fc7ce.PNG)

Astral is a cross chain Bridge and DEX which lets users bridge and rade assets across 9 EVM chains aswell as many legacy & non EVM chains such as Bitcoin, Dogecoin, Zcash etc. Users can bridge native assets in return for an Astral synthtic version of that asset (formerly ren asset) on the destination chain. Once bridged, users can then trade in astrals AMM contract (which will be deployed on all chains) with all other synthetic assets supported by astral. Since identical astral assets are minted on all chains and the fact that USDT is used as the AMM's base token on each chain, it can be garanteed that liquidity concentration for each possible token pair is the same amoung all chains. 

when a user briges a native asset into a synthetic asset and preforms a swap on the destination chain, that asset can be bridged back and swapped for the original native asset at face value.

## to view frontend
https://github.com/mcgraneder/astral-bridge


# Other repos used for Astral
## Astral Signature Verifier  --->   https://github.com/mcgraneder/Astral-Signature-Verifier
## Astral Smart Contracts     --->   https://github.com/mcgraneder/astral-sol/tree/main/contracts
## Astral Backend          ------>   https://github.com/mcgraneder/astral-sol


##Astral and this readme is a work in progress
