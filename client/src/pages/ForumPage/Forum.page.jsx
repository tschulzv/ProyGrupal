import React, { useState, useEffect } from 'react';
import HTTPClient from '../../utils/HTTPClient';
import "../../utils/StyleUtils.style.css";
import Navbar from "../../components/Navbar.component.jsx";
import Forum from "../../components/Forum/Forum.component.jsx"
import { useNavigate, Link } from "react-router-dom";

const ForumPage = ({setUserData}) => {
    const client = new HTTPClient();
    const [forums, setForums] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        client.getPageForum(page)
            .then(res => {
                setForums(res.data.forums);
                console.log("publicaciones obtenidas con exito");
            })
            .catch(err => {
                console.log(err);
            });
    }, [page]);

    const navigate = useNavigate();
    
    const loadPage = () => {
        client.getPageForum(page)
            .then(res => {
                setForums(res.data.forums);
                console.log("publicaciones obtenidas con exito");
            })
            .catch(err => {
                console.log(err);
            });
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
            });

        loadPage(); // Llama a loadPage sin argumentos para obtener la página actual
    },[]);

    const prevPage = () => {
        loadPage(page - 1);
        setPage(page - 1);
    }

    const nextPage = () => {
        loadPage(page + 1);
        setPage(page + 1);
    }

    const createForum = () => {
        navigate("/create-forum");
    }

    return (
        <div className="wrapper">
            <Navbar/>
            <p><h1>Foros</h1>
            <button onClick={createForum}>Crear Foro</button></p>
            <div className="content">
                { forums && (
                <div className="home-feed">
                    {
                        forums.map((forum) => (
                            <Forum key={forum._id} forum={forum} />
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

export default ForumPage;
