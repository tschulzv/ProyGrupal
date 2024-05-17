import {
    useNavigate, 
    Link,
    useParams
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.component";
import "../../utils/StyleUtils.style.css";
import "./SearchPage.style.css";
import HTTPClient from "../../utils/HTTPClient";

const SearchPage = () => {
    const { tagged } = useParams(); // para buscar una etiqueta de especie
    const [searchSpecies, setSearchSpecies] = useState(tagged || null);
    const [startSearch, setStartSearch] = useState(tagged); // inicia la busqueda, cuando el usuario presiona 'buscar' 
    const [results, setResults] = useState();
    const [apiInfo, setApiInfo] = useState(); // para almacenar info de trefle
    const client = new HTTPClient();

    useEffect(() => {
        if (tagged) {
           search(tagged);
        }
    },[]);

    const handleSearch = (e) => {
        e.preventDefault();
        const formattedSpecies = searchSpecies.trim().toLowerCase();
        search(formattedSpecies);
        setStartSearch(true);
    }

    const search = (formattedSpecies) => {
        // obtener info sobre la especie de Trefle 
        client.getPlantInfo(formattedSpecies)
        .then(res => {
            console.log("TREFLEAPI: ", res.data);
            setApiInfo(res.data[0])
        })
        .catch(err => console.log("FRONT- error con trefle", err));
        // obtener posts de esa especie
        client.getPostsBySpecies(formattedSpecies)
        .then(res => {
            console.log("se encontro de la especie: ", res.data.posts);
            setResults(res.data.posts)
        })
        .catch(err => { console.log(err)} );        
    }

    return (
        <div className="wrapper">
                <Navbar/>
                <div className="content-box">
                    <div className="search-bar">
                        <label htmlFor="search-input" className="title">Busca una especie</label>
                        <input id="search-input" type="text" onChange={e => setSearchSpecies(e.target.value)}></input>
                        <button onClick={e => handleSearch(e)}>Buscar</button>
                    </div>
                    { searchSpecies && startSearch && 
                          <>
                          <div className="plant-info">
                            <p className="title">INFORMACIÓN</p>
                            { apiInfo === undefined || apiInfo === null ? <p> Cargando... </p> :  <>
                                <p>Nombre común: {apiInfo.common_name}</p>
                                <p>Nombre científico: {apiInfo.scientific_name}</p>
                                <p>Familia: {apiInfo.family}</p>
                                <p>Género: {apiInfo.genus}</p>
                            </>
                            }
                            </div>
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