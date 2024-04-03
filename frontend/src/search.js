import React, {useState} from 'react';
import {searchMovieAPI} from "./api";
import MovieList from "./movieCard";


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
            <form onSubmit={handleSubmit}>
                <label>
                    Tite:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Search</button>
            </form>
            <div>
                <MovieList movies={movies} />
            </div>
        </div>

    )
}


export default Search