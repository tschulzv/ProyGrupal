import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState } from "react";
import "../utils/StyleUtils.style.css";

const Navbar = (props) => {

    return (
        <div className = "navbar">
            <img src="#" alt="logo" className="logo"></img>
            <ul className="nav-links">
                <li className="link"><Link to="/search">BUSQUEDA</Link></li>
                <li className="link"><Link to="/profile">PERFIL</Link></li>
                <li className="link"><Link to="/forum">FORO</Link></li>
                <li className="link"><Link to="/create-post">NUEVO POST</Link></li>
            </ul>
        </div>
    )
}

export default Navbar;