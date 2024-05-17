import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../utils/StyleUtils.style.css";
import "./Forum.style.css";
import HTTPClient from "../../utils/HTTPClient";

const Forum = ({forum}) => {
    const [user, setUser] = useState(null);
    const client = new HTTPClient();
    const navigate = useNavigate();

    // obtener datos del usuario que posteó
    useEffect(() => {
        client.getUserById(forum.userId)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    },[])

    const openForum = (() => {
        navigate(`/forum/${forum._id}`);
    });

    return (
        forum && user && (
        <div className="forum-preview">
                <h2 onClick={openForum}>{forum.title}</h2>
                <div className="post-info">
                    <p><Link to={`/profile/${user.userId}`} className="forum-user">{forum.userName}</Link></p>
                    <p className="forum-description">{forum.description}</p>
                </div>
                <p>{forum.commentsForum.length} comentarios</p>
        </div> )
    )
}

export default Forum;