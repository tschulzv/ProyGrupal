import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import SearchResults from "../../components/SearchResults/SearchResults.component"
import Navbar from "../../components/Navbar.component";
import "../../utils/StyleUtils.style.css";
import HTTPClient from "../../utils/HTTPClient";

const SearchPage = () => {
    const [searchSpecies, setSearchSpecies] = useState();
    const [startSearch, setStartSearch] = useState(false); // inicia la busqueda, cuando el usuario presiona 'buscar' 
    const [results, setResults] = useState();
    const [apiInfo, setApiInfo] = useState(); // para almacenar info de trefle
    const client = new HTTPClient();


    const handleSearch = (e) => {
        e.preventDefault();
        // iniciar la busqueda 
        console.log("se buscara: ", searchSpecies);
        
        // obtener info sobre la especie de Trefle 
        client.getPlantInfo(searchSpecies)
        .then(res => {
            console.log("TREFLEAPI: ", res.data);
            setApiInfo(res.data[0])
        })
        .catch(err => console.log("FRONT- error con trefle", err));
        // obtener posts de esa especie
        client.getPostsBySpecies(searchSpecies)
        .then(res => {
            console.log("se encontro de la especie: ", res.data.posts);
            setResults(res.data.posts)
        })
        .catch(err => { console.log(err)} );        
        setStartSearch(true);
    }

    return (
        <div className="wrapper">
                <Navbar/>
                <div className="content">
                    <h1>Busca una especie</h1>
                    <input type="text" onChange={e => setSearchSpecies(e.target.value)}></input>
                    <button onClick={e => handleSearch(e)}>Buscar</button>
                    { searchSpecies && startSearch && 
                          <>
                           {apiInfo && 
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
                    }
                </div>
        </div>
    )
}

export default SearchPage;