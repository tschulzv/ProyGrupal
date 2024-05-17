import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../utils/StyleUtils.style.css";
import "./Forum.style.css";
import HTTPClient from "../../utils/HTTPClient";

const Forum = ({ forum }) => {
    const [user, setUser] = useState(null);
    const client = new HTTPClient();
    const navigate = useNavigate();

    // Obtener datos del usuario que posteó
    useEffect(() => {
        client.getUserById(forum.userId)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [forum.userId]);

    const openForum = () => {
        navigate(`/forum/${forum._id}`);
    };

    const truncatedDescription = forum.description.length > 100 ? `${forum.description.slice(0, 100)}...` : forum.description;

    return (
        forum && user && (
            <div className="forum-preview">
                    <div className="preview-title">
                        <h2 onClick={openForum}>{forum.title}</h2>
                    </div>
                    <div className="post-info">
                        <p>
                            <Link to={`/profile/${user.userId}`} className="forum-user">
                                {forum.userName}
                            </Link>
                        </p>
                        <div dangerouslySetInnerHTML={{ __html: truncatedDescription }} />
                    </div>
                    <p>{forum.commentsForum.length} comentarios</p>
            </div>
        )
    );
}

export default Forum;