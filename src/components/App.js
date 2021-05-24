import React, { Component } from 'react';
import Web3 from "web3";
import Navbar from "./Navbar";
import Input from "./Input";
import List from "./List";
import './App.css';
import Dins from "../abis/Dinsta.json";

const {create}=require('ipfs-http-client');
const ipfs=create({host:'ipfs.infura.io', port:5001,protocol:'https'});
class App extends Component {


  constructor(props)
  {
    super(props);

    this.state={
      account:'',
      Dinstagram:null,
      images:[],
      count:0,
      Buff:'',
      hash:''

    }

    this.bufferimage=this.bufferimage.bind(this);
    this.addImage=this.addImage.bind(this);
    this.tipImage=this.tipImage.bind(this);
  }

async componentWillMount(){
  await this.loadWeb3();
  await this.loadData();
}

  async loadWeb3(){
    if(window.ethereum)
    {
      window.web3=new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if(window.web3)
    {
      window.web3=new Web3(window.web3.currentProvider);
    }
    else
    {
      alert("No Client found");
    }
  }

  async loadData(){
    const web3=window.web3;
    const accounts=await web3.eth.getAccounts();
    this.setState({account:accounts[0]});
    const netId=await web3.eth.net.getId();
    
    if(netId>0)
    {
    const Dinstagram=await web3.eth.Contract(Dins.abi,Dins.networks[netId].address);
    this.setState({Dinstagram});
    const count=await Dinstagram.methods.count.call();
    this.setState({count:count.toNumber()});
    console.log(Dinstagram.methods);

    for(var i=1;i<=count;i++)
    {
      const image=await Dinstagram.methods.Images(i).call();
      this.setState({images:[...this.state.images,image]});
    }
  }
  else{
    alert("Contract not deployed");
  }
  }

  bufferimage=(event)=>{
    event.preventDefault();
    const file=event.target.files[0];
    const reader=new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend=()=>{
      this.setState({Buff:Buffer(reader.result)});
    }
  }

  async if(n){
    const res=await ipfs.add(this.state.Buff);
    this.setState({hash:res.path})
    this.state.Dinstagram.methods.addimage(n,this.state.hash).send({from:this.state.account});
  }
  addImage=(n)=>{
    console.log(this.state.Buff)
    this.if(n);
  }

  tipImage(i){

    this.state.Dinstagram.methods.tipimage(i).send({from:this.state.account, value:window.web3.utils.toWei('0.1','Ether')});

  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <div className="column">
      <Navbar account={this.state.account}/>
        </div>
        </div>
        <div className="row">
        <div className="column aq">
        <Input bufferimage={this.bufferimage} addImage={this.addImage}/>
        </div>
        </div>
        <div className="row">
        <div className="column aq">
        <List images={this.state.images} tipImage={this.tipImage}/>
        
        </div>
        </div>
        
      </div>
    );
  }
}

export default App;
