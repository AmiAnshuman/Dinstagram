import React, { Component } from 'react'
import "./Navbar.css";
export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light ">
  <div className="container-fluid ">
    <h4 className=" add" >Dinstagram</h4>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse hello" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
        <h4 className="add">{this.props.account}</h4>
    </div>
  </div>
</nav>
        )
    }
}
