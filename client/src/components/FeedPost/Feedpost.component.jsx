// REPRESENTA A UN POST DEL FEED PRINCIPAL (INICIO)
import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../utils/StyleUtils.style.css";
import "./Feedpost.style.css"
import HTTPClient from "../../utils/HTTPClient";

const Feedpost = ({post}) => {
    const [user, setUser] = useState(null);
    const client = new HTTPClient();
    const navigate = useNavigate();

    // obtener datos del usuario que posteó
    useEffect(() => {
        client.getUserById(post.userId)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    },[])

    const openPost = (() => {
        navigate(`/posts/${post._id}`);
    });

    return (
        post && user && (
        <div className="post-wrapper">
            <img src={post.filename}  alt={`${post.description}`} className="feed-img" onClick={openPost}></img>
            <div className="post-info">
                <p>
                    <span><Link to="/perfildelusuario" className="post-user">{user.name}</Link></span>
                    <span><Link to="/postsdelaespecie" className="post-species">{post.species}</Link></span>
                </p>
                <p className="post-description">{post.description}</p>
            </div>
        </div> )
    )
}

export default Feedpost;
