import React, {useEffect, useState} from 'react';
import {getMoviesAPI, getSeriesListAPI, searchMovieAPI, searchSeriesAPI} from "./api";
import MovieList from "./movieCard";

import "./search.css"


function Search() {

    const [formData, setFormData] = useState([])
    const [media, setMedia] = useState([]);
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
                    setMedia(moviesData);
                })
        } else if (category === 'series') {
            searchSeriesAPI(formData.title) // Assuming you have a function to fetch TV shows data
                .then(res => {
                    const tvShowsData = res.data;
                    setMedia(tvShowsData);
                })
        }
    };


    return (
        <div>
            <div>
                <button onClick={() => setCategory('movies')}>Movies</button>
                <button onClick={() => setCategory('series')}>Series</button>
            </div>
            <form className="search-form" onSubmit={handleSubmit}>
                <label htmlFor="title_movie">Title </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            <div>
                <MovieList movies={media} mediatype={category}/>
            </div>
        </div>

    )
}


export default Search