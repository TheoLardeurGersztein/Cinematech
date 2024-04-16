import React, {useState, useEffect} from 'react';
import {getMoviesAPI} from './api';
import MovieList from "./movieCard";

function Library() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);

    function getMovies() {
        getMoviesAPI()
            .then(res => {
                const moviesData = res.data;
                setMovies(moviesData);
            })
    }

    return (
        <div>
            <MovieList movies={movies}/>
        </div>
    );
}

export default Library;