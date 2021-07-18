import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Animals extends Component {
    render(){
        return (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/animals">Animals</Link></li>
            </ul>
        );
    }
}