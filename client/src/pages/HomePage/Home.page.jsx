import React, { useState, useEffect } from 'react';
import HTTPClient from '../../utils/HTTPClient';
import "../../utils/StyleUtils.style.css";
import "./Home.style.css";
import Navbar from "../../components/Navbar.component.jsx";
import FeedPost from "../../components/FeedPost/Feedpost.component.jsx"

const HomePage = ({setUserData}) => {
    const client = new HTTPClient();
    const [posts, setPosts] = useState(null);
    const [page, setPage] = useState(1);

    const loadPage = (pageNum) => {
        client.getPagePosts(pageNum)
            .then(res => {
                setPosts(res.data.posts);
                console.log("publicaciones obtenidas con exito");
            })
            .catch(err => {
                console.log(err);
            })
    }

    // obtener los datos del usuario y pasar a la app, obtener publicaciones
    useEffect(() => {
        client.getUserData()
            .then(res => {
                setUserData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        loadPage(page);
    },[]);

    const prevPage = () => {
        loadPage(page - 1);
        setPage(page - 1);
    }

    const nextPage = () => {
        loadPage(page + 1);
        setPage(page + 1);
    }

    return (
        <div className="wrapper">
            <Navbar/>
            <div className="content">
                { posts && (
                <div className="home-feed">
                    {
                        posts.map((post) => (
                            <FeedPost key = {post._id} post={post} />
                        ))
                    }
                </div>) }
                <div className="pagination">
                    <button onClick={prevPage} disabled={page === 1}>Página anterior</button>
                    <button onClick={nextPage}>Página siguiente</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;