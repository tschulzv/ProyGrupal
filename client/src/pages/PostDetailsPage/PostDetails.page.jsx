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
import Comment from "../../components/Comment/Comment.component";

const PostDetails = ( {userData} ) => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [userName, setUserName] = useState();
    const [newComment, setNewComment] = useState();
    const client = new HTTPClient();

    useEffect(()=>{
        console.log("POST ID:", id);
        client.getPostById(id)
            .then(res => {
                let userId = res.data.post.userId;
                console.log(`obtenido post id ${id}`, res.data.post)
                setPost(res.data.post)
                console.log("comentarios:", res.data.post.comments);
                setComments(res.data.post.comments)
                client.getUserById(userId)
                    .then(res => {
                        console.log(`obtenido user id ${userId}`, res.data)
                        setUserName(res.data.name)})
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    },[]);

    const submitComment = (e) => {
        e.preventDefault();
        let comment = {
            "userId" : userData.userId,
            "text" : newComment
        } 
        console.log("se enviará el comentario", comment);
        client.saveComment(id, comment)
            .then(res => {
                console.log("se agrego el comentario a la db", res);
                let updateComments = [...comments, res.data.commentId];
                console.log("updatedcomments", updateComments)
                setComments(updateComments);
                setNewComment("");
            })
            .catch(err => { console.log("ERROR:", err)});
    }

    const formatSpecies = (species) => {
        const firstLetter = species.charAt(0)
        const firstLetterCap = firstLetter.toUpperCase()
        const remainingLetters = species.slice(1)
        const capitalizedWord = firstLetterCap + remainingLetters
        return capitalizedWord;
    }

    return (
        <div className="wrapper">
            <Navbar/>
            <div className="content">
                {post && userName && (
                    <div className="detail-wrapper">
                        <img src={post.filename}  alt={`${post.description}`} className="detail-img"></img>
                        <div className="detail-info">
                            <p><Link to={`/profile/${post.userId}`} className="post-user">{userName}</Link></p>
                            <p><Link to={`/search/${post.species}`} className="post-species">{formatSpecies(post.species)}</Link></p>
                            <p className="post-description">{post.description}</p>
                            <h2>Comentarios</h2>
                            {(!comments || comments.length === 0) ? <p>Aún no hay comentarios...</p> :
                                (
                                    comments?.map((comment) => (
                                        <Comment key={comment} id={comment} />
                                    )))
                            }
                            <div className="input-comment">
                                <input name="write-comment" type="text" placeholder="Escribe un comentario" onChange={(e) => setNewComment(e.target.value)}></input>
                                <button onClick={e => submitComment(e)} className="btn">Publicar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )


}

export default PostDetails;