// REPRESENTA A UN POST DEL FEED PRINCIPAL (INICIO)
import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState } from "react";
import "./StyleUtils.style.css";

const Feedpost = ({post}) => {
    // post en el feed debe contener imagen, descripcion, usuario, especie
    // hacer funcion openPost que abra los detalles de la publicacion (comentarios etc)
    return (
        <div className="post-wrapper">
            <img src={post.src} alt={`post by ${post.user}`} className="feed-img" onClick={openPost}></img>
            <div className="post-info">
                <p className="post-user">{post.user}</p>
                <p className="post-description">{post.description}</p>
                <p className="post-species"></p>
            </div>
        </div>
    )
}

export default Feedpost;