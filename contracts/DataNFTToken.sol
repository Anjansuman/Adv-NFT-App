//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DataNFTToken is ERC721Enumerable, Ownable {

    struct Ticket {
        string name;
        uint256 price;
        uint256 totalSupply;
        uint256 sold;
        string imageURI;
    }

    Ticket[] private Tickets;
    uint256 tokenId = 0;

    // this stores which tokenId is linked with which ticket (ticket is found it's array address)
    mapping(uint256 => uint256) private tokenIdToTicketIndex;

    constructor() ERC721("DataNFTToken", "DNT") {}

    function createTicket(string memory _name, uint256 _price, uint256 _totalSupply, string memory _imageURI) public onlyOwner {
        Ticket memory newTicket = Ticket(_name, _price, _totalSupply, 0, _imageURI);
        Tickets.push(newTicket);
    }

    function getAllTickets() public view returns(Ticket[] memory) {
        return Tickets;
    }

    function purchaseTicket(string memory _name) public payable {
        // do entry level checks in frontend
        uint256 index = Tickets.length;

        for(uint i = 0; i < Tickets.length; i++) {
            if(keccak256(abi.encodePacked(Tickets[i].name)) == keccak256(abi.encodePacked(_name))) {
                index = i;
                break;
            }
        }

        require(index < Tickets.length, "Ticket not found!");

        Ticket storage ticket = Tickets[index];

        require(msg.value == ticket.price, "Pay correctly!");
        require(ticket.sold < ticket.totalSupply, "No Tickets Left!");

        tokenIdToTicketIndex[tokenId] = index;
        _safeMint(msg.sender, tokenId);
        tokenId++;

        ticket.sold++;

    }

    function ticketsOfOwner(address user) public view returns(Ticket[] memory) {

        uint256 count = balanceOf(user);
        Ticket[] memory tickets = new Ticket[](count);

        for(uint i = 0; i < count; i++) {
            uint256 _tokenId = tokenOfOwnerByIndex(user, i);
            uint256 TicketIndex = tokenIdToTicketIndex[_tokenId];
            tickets[i] = Tickets[TicketIndex];
        }

        return tickets;

    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

}