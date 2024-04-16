import React, {useState} from 'react';
import {searchMovieAPI} from "./api";
import MovieList from "./movieCard";

import "./search.css"


function Search() {

    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState([])


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchMovieAPI(formData.title)
            .then(response => {
                setMovies(response.data);
            })
    };


    return (
        <div>
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
        <MovieList movies={movies}/>
    </div>
</div>

)
}


export default Search