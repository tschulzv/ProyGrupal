import {
    useNavigate, 
    Link,
    useParams
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../utils/StyleUtils.style.css";
import "./PostDetails.style.css"
import HTTPClient from "../../utils/HTTPClient";
import Navbar from "../../components/Navbar.component";

const PostDetails = ( {userData} ) => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [newComment, setNewComment] = useState();
    const client = new HTTPClient();

    useEffect(()=>{
        console.log(id);
        client.getPostById(id)
            .then(res => {
                console.log(`POST id ${id}`, res.data.post)
                setPost(res.data.post)})
            .catch(err => console.log(err));
    },[]);

    const submitComment = (e) => {
        e.preventDefault();
        let comment = {
            "userId" : userData.userId,
            "text" : newComment
        } 
        client.createComment(id, comment)
            .then(res => {
                console.log("se agrego el comentario a la db");
                post.comments.push(comment);
            })
            .catch(err => { console.log("ERROR:", err)});
    }

    return (
        <div className="wrapper">
            <Navbar/>
            <div className="content">
                {post && (
                    <div className="post-wrapper">
                        <img src={post.filename}  alt={`${post.description}`} className="post-img"></img>
                        <div className="post-info">
                            <p><Link to="/perfildelusuario" className="post-user">{post.userId}</Link></p>
                            <p><Link to="/postsdelaespecie" className="post-species">{post.species}</Link></p>
                            <p className="post-description">{post.description}</p>
                            <p>Comentarios</p>
                            {!post.comments ? <p>Aún no hay comentarios...</p> :
                            (
                                post.comments.map((comment) => {
                                    <div key={comment._id} className="comment-wrapper">
                                        <p className="comment-user">{comment.userId/* cambair a q muestre el nombre*/}</p> 
                                        <p className="comment-text">{comment.text}</p>
                                    </div>
                                })
                            )
                            }
                            <label htmlFor="write-comment">Escribe un comentario...</label>
                            <input name="write-comment" type="text" onChange={(e) => setNewComment(e.value)}></input>
                            <button onClick={e => submitComment(e)}>Publicar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )


}

export default PostDetails;