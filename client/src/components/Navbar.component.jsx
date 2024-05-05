import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState } from "react";
import "../utils/StyleUtils.style.css";

const Navbar = (props) => {

    return (
        <div className = "navbar">
            <Link to="/home">
                <img src="#" alt="logo" className="logo"></img>
            </Link>
            <ul className="nav-links">
                <li><Link to="/search" className="link">BUSCAR</Link></li>
                <li><Link to="/profile" className="link">MI PERFIL</Link></li>
                <li><Link to="/forum" className="link">FORO</Link></li>
                <li><Link to="/create-post" className="link">NUEVO POST</Link></li>
                <li><Link to="/settings" className="link">AJUSTES</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;