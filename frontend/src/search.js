import React, {useState} from 'react';
import {searchMovieAPI} from "./api";


function Search() {

    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
    });


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
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <p>{movie.title}</p>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>

    )
}


export default Search