
**In this Platform admin or the contract owner can create NFTs, that will work as a ticket, and can be verified across Ethereum's chain**

**Required functionalities**

=> Contract: Stores actual logic and data.

=> Client-code: User interface

=> Abstraction: Becomes intermediatary between user and client ,and fetches abi of smart-contract and, talks to the blockchain for every work.

=> Pinata upload Backend: IPFS [Decentralized storage]


**Workflow for creating a NFT**

user -> client-code -> create-token -> hitting pinata from our backend -> getting image hash -> create-token abstraction -> contract

**Workflow for buying a NFT**

user -> client-code -> fetching-NFT-avaibility -> paying-for-it -> data-changes-to-smart-contract -> NFT-gets-assigned-to-that-user

**Workflow if a database is added for fetching data more fastly.**

user -> client -> any function -> hitting our backend -> database -> checking transaction signature -> contract
