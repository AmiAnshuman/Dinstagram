pragma solidity ^0.5.16;

contract Dinsta
{
    uint public count;

    struct image{
        uint id;
        string name;
        string hass;
        uint totaltip;
        address payable owner;
    }

    mapping(uint=>image) public Images;

    event imageCreated(uint id,string name,string hass,uint totaltip,address payable owner);
    event imageTipped(uint id,string name,string hass,uint totaltip,address payable owner);
    constructor() public{
        count=0;
    }

    function addimage(string memory n,string memory h) public
    {
        require(bytes(n).length!=0 && bytes(h).length!=0);
        count++;
        Images[count]=image(count,n,h,0,msg.sender);
        emit imageCreated(count,n,h,0,msg.sender);
    }

    function tipimage(uint id) public payable
    {
        require(id>0 && id<=count);
        image memory Image=Images[id];
        require(msg.value>0 && msg.sender!=Image.owner);
        Image.totaltip=Image.totaltip+msg.value;
        address(Image.owner).transfer(msg.value);
        Images[id]=Image;
        emit imageTipped(id,Image.name,Image.hass,Image.totaltip,Image.owner);
    }
}