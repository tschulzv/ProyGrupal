import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../utils/StyleUtils.style.css";
import "./SearchResults.style.css"
import HTTPClient from "../../utils/HTTPClient";

const SearchResults = (props) => {
    const {species} = props.searchSpecies; // especie buscada por el usuario
    const [results, setResults] = useState();
    const [apiInfo, setApiInfo] = useState(); // para almacenar info de trefle
    const client = new HTTPClient();

    useEffect(() => {
        console.log("en search results, buscar: ", species);
        // obtener info sobre la especie de Trefle 
        client.getPlantInfo(species)
            .then(res => {
                console.log("TREFLEAPI: ", res.data);
                setApiInfo(res.data[0])
            })
            .catch(err => console.log(err));
        // obtener posts de esa especie
        client.getPostsBySpecies(species)
            .then(res => {
                setResults(res.data.posts)
            })
            .catch(err => { console.log(err)} );        
    }, [])

    return (
        <>
            { apiInfo && 
                <div className="plant-info">
                    <p>Familia: {apiInfo.family}</p>
                    <p>Género: {apiInfo.genus}</p>
                </div>
            }
            <div className="results-wrapper">
                { results && results.map((post) => (
                    <Link to={`/posts/${post._id}`}>
                        <img key={post._id} src={post.filename} className="thumbnail"></img>
                    </Link>
                ))
                }
            </div>
        </>
    )
}

export default SearchResults;