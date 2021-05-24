import React, { Component } from 'react'
import "./List.css";
export default class List extends Component {
    render() {
        return (
            <>
            {this.props.images.map((image,key)=>{

                const hash=`https://ipfs.infura.io/ipfs/${image.hass}`;
                console.log(hash);
                return(
                    <div className="container crd ad as" >
                    <h4 className="as">{image.name}</h4>
                    
            <img src={hash} className="card-img-top" alt="..."/>
            <h4>TotalTip:{image.totaltip.toString()}</h4>
            <button name ={image.id}className="btn " onClick={(event)=>{this.props.tipImage(event.target.name)}}>Tip 0.1 Ether</button>
            </div>
                )
            })
            
            }
            </>
        );
    }
}
