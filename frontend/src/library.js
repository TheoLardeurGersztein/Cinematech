import React, {useState, useEffect} from 'react';
import {getMoviesAPI, getSeriesAPI, getSeriesListAPI} from './api';
import MovieList from "./movieCard";

function Library() {

    const [media, setMedia] = useState([]);
    const [category, setCategory] = useState('movies'); // Default category is movies

    useEffect(() => {
        fetchData();
    }, [category]);

    function fetchData() {
        if (category === 'movies') {
            getMoviesAPI()
                .then(res => {
                    const moviesData = res.data;
                    setMedia(moviesData);
                })
        } else if (category === 'series') {
            getSeriesListAPI() // Assuming you have a function to fetch TV shows data
                .then(res => {
                    const seriesData = res.data;
                    setMedia(seriesData);
                })
        }
    }

    return (
                <div>
                    <div>
                        <button onClick={() => setCategory('movies')}>Movies</button>
                        <button onClick={() => setCategory('series')}>Series</button>
                    </div>
                    <MovieList movies={ media } mediatype={ category }/>
                </div>
            );
}

export default Library;