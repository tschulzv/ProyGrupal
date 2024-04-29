import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState } from "react";
import "./StyleUtils.style.css";

const Navbar = (props) => {

    return (
        <div className = "navbar">
            <img src="#" alt="logo" className="logo"></img>
            <ul className="nav-links">
                <li><Link to="/search" className="link">BUSQUEDA</Link></li>
                <li><Link to="/profile" className="link">PERFIL</Link></li>
                <li><Link to="/forum" className="link">FORO</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;