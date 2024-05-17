import React, { useState, useEffect } from "react";
import {
    useNavigate, 
    Link
} from "react-router-dom";
import "../../utils/StyleUtils.style.css";
import "./Comment.style.css"
import HTTPClient from "../../utils/HTTPClient";

const Comment = (props) => {
    const [comment, setComment] = useState();
    const [userName, setUserName] = useState();
    const client = new HTTPClient();

    useEffect(() => {
        console.log("comentario props id:", props.id);
        client.getCommentById(props.id)
            .then(res => {
                setComment(res.data.comment)
                client.getUserById(res.data.comment.userId)
                    .then(res => {
                        console.log(`obtenido user id ${res.data.userId}`, res.data)
                        setUserName(res.data.name)})
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    },[]);

    return (
        comment && userName && (
        <div className="comment-wrapper">
            <p>
            <Link to={`/profile/${comment.userId}`} className="comment-user">
                {userName}</Link></p> 
            <p className="comment-text">{comment.text}</p>
        </div>)
    )

}

export default Comment;