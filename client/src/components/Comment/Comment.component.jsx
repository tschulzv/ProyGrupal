import React, { useState, useEffect } from "react";
import "../../utils/StyleUtils.style.css";
import "./Comment.style.css"
import HTTPClient from "../../utils/HTTPClient";

const Comment = (props) => {
    const [comment, setComment] = useState();
    const client = new HTTPClient();

    useState(() => {
        client.getCommentById(props.id)
            .then(res => setComment(res.data.comment))
            .catch(err => console.log(err));
    },[]);

    return (
        comment && (
        <div className="comment-wrapper">
            <p className="comment-user">{comment.userId/* cambair a q muestre el nombre*/}</p> 
            <p className="comment-text">{comment.text}</p>
        </div>)
    )

}

export default Comment;