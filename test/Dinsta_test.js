const Dinsta=artifacts.require('Dinsta');
const { assert } = require("chai");

contract("Dinsta",([poster,tipper])=>{

    let Dinstagram
    before(async()=>{
        Dinstagram=await Dinsta.deployed();
    })

    describe("count check",async()=>{
        it('check for count',async()=>{
            let count=await Dinstagram.count();
            assert.equal(count.toNumber(),0);
        })
    })

    describe("add image",async()=>{

        let result,ic;
        before(async()=>{
            result=await Dinstagram.addimage("image1","abc",{from:poster});
            ic=await Dinstagram.count();
        })
        it('check image add function',async()=>{
            let final=result.logs[0].args;
            assert.equal(final.id.toNumber(),ic.toNumber());
            assert.equal(final.owner,poster);
        })
        
    })

    describe("tip image",async()=>{

        let result1,ic,bal1,bal2;
        before(async()=>{
            bal1=await web3.eth.getBalance(tipper);
            result1=await Dinstagram.tipimage(1,{from:tipper, value:web3.utils.toWei('1','Ether')});
            ic=await Dinstagram.count();
            bal2=await web3.eth.getBalance(tipper);
        })
        it('check image tip function',async()=>{
            let final=result1.logs[0].args;
            console.log(bal1);
            console.log(bal2);
            assert.equal(final.id.toNumber(),ic.toNumber());
            assert.equal(final.owner,poster);
            assert.equal(final.totaltip,'1000000000000000000');
        })
        
    })
})