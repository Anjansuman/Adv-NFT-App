//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract IPFSdataNFT is ERC721 {

    string private imageURI;

    constructor(string memory _imageURI) ERC721("Data", "DT") {
        imageURI = _imageURI;
        _safeMint(msg.sender, 1);
    }

    function tokenURI(uint256) public view override returns(string memory) {
            return string(abi.encodePacked(
        'data:application/json;utf8,',
        '{"name":"My NFT", "description":"NFT with IPFS image", ',
        '"image":"', imageURI, '"}'
    ));
    }

}