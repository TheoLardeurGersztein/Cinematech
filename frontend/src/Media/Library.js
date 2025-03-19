import React, {useEffect, useState} from 'react';
import {getContinueWatchingList, getMoviesAPI, getSeriesListAPI, searchMovieAPI, searchSeriesAPI} from "../api";

import "./Search.css"
import './CategoryChoice.css'
import MediaLib from "./MediaLib";


function Library() {


    const [medias, setMedias] = useState([]);
    const [category, setCategory] = useState('movies'); // Default category is movies

    useEffect(() => {
        const fetchData = async () => {
            if (category === 'movies') {
                const movies = await getMoviesAPI()
                setMedias(movies.data)
            } else {
                const series = await getSeriesListAPI()
                setMedias(series.data)
            }
        }
        fetchData();
    }, [category]);


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
            </div>
            <div>
                <MediaLib medias={medias}/>
            </div>
        </div>

    )
}


export default Library