import {
    useNavigate, 
    Link
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import SearchResults from "../../components/SearchResults/SearchResults.component"
import Navbar from "../../components/Navbar.component";
import "../../utils/StyleUtils.style.css";
//import "./SearchPage.style.css"
import HTTPClient from "../../utils/HTTPClient";

const SearchPage = () => {
    const [searchSpecies, setSearchSpecies] = useState();
    const [startSearch, setStartSearch] = useState(false); // inicia la busqueda, cuando el usuario presiona 'buscar' 

    const handleSearch = (e) => {
        e.preventDefault();
        // iniciar la busqueda 
        console.log("se buscara: ", searchSpecies);
        setStartSearch(true);
    }

    return (
        <div className="wrapper">
                <Navbar/>
                <div className="content">
                    <h1>Busca una especie</h1>
                    <input type="text" onChange={e => setSearchSpecies(e.target.value)}></input>
                    <button onClick={e => handleSearch(e)}>Buscar</button>
                    { startSearch &&
                        <SearchResults searchSpecies={searchSpecies} />
                    }
                </div>
        </div>
    )
}

export default SearchPage;