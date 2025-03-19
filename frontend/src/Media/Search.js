import React, {useState} from 'react';
import {searchMovieAPI, searchSeriesAPI} from "../api";

import "./Search.css"
import './CategoryChoice.css'
import MediaLib from "./MediaLib";


function Search() {

    const [formData, setFormData] = useState([])
    const [medias, setMedias] = useState([]);
    const [category, setCategory] = useState('movies'); // Default category is movies

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category === 'movies') {
            searchMovieAPI(formData.title)
                .then(res => {
                    const moviesData = res.data;
                    setMedias(moviesData);
                })
        } else if (category === 'series') {
            searchSeriesAPI(formData.title)
                .then(res => {
                    const tvShowsData = res.data;
                    setMedias(tvShowsData);
                })
        }
    };


    return (
        <div>
            <div className="search-container">
                <div className="button-container">
                    <button
                        className={`category-button ${category === 'movies' ? 'active' : ''}`}
                        onClick={() => setCategory('movies')}>
                        Movies
                    </button>
                    <button
                        className={`category-button ${category === 'series' ? 'active' : ''}`}
                        onClick={() => setCategory('series')}>
                        Series
                    </button>
                </div>
                <form className="search-form" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div>
                <MediaLib medias={medias} />
            </div>
        </div>

    )
}


export default Search