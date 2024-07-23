import React, {useState, useEffect} from 'react';
import {dicoverMoviesAPI, dicoverSeriesAPI} from '../api';
import MovieList from './MovieCard';
import './CategoryChoice.css'

function Discover() {
    const [media, setMedia] = useState([]);
    const [category, setCategory] = useState('movies'); // Default category is movies


    useEffect(() => {
        fetchData();
    }, [category]);

    function fetchData() {
        if (category === 'movies') {
            dicoverMoviesAPI()
                .then(res => {
                    const moviesData = res.data;
                    setMedia(moviesData);
                })
        } else if (category === 'series') {
            dicoverSeriesAPI() // Assuming you have a function to fetch TV shows data
                .then(res => {
                    const seriesData = res.data;
                    setMedia(seriesData);
                })
        }
    }

    return (
        <div >
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

            <MovieList movies={media} mediatype={category}/>
        </div>
    );
}

export default Discover;