import React, {useState, useEffect, useRef} from 'react';
import {dicoverMoviesAPI, dicoverSeriesAPI} from '../api';
import MediaList from './MediaList';
import './CategoryChoice.css'
import Loading from "../Loading";

function Discover() {
    const genres = [
        'Adventure', 'Fantasy', 'Animation', 'Drama',
        'Horror', 'Action', 'Comedy', 'History',
        'Western', 'Thriller', 'Crime', 'Documentary',
        'Science Fiction', 'Mystery',
        'Music', 'Romance', 'Family', 'War',
        'TV Movie'
    ];
    const series_genres = [
        "Animation", "Drama", "Comedy", "Western",
        "Crime", "Documentary", "Mystery", "Family",
        "Action & Adventure", "Kids", "News", "Reality",
        "Sci-Fi & Fantasy", "Soap", "Talk", "War & Politics"
    ];
    const [category, setCategory] = useState('movies'); // Default category is movies
    const [movies, setMovies] = useState(() => {
            const moviesData = localStorage.getItem('moviesData');
            return moviesData ? JSON.parse(moviesData) : Array(genres.length).fill([]);
        }
    )
    const [series, setSeries] = useState(() => {
            const seriesData = localStorage.getItem('seriesData');
            return seriesData ? JSON.parse(seriesData) : Array(series_genres.length).fill([]);
        }
    )

    const [media, setMedia] = useState([]);


    useEffect(() => {
        //fetchData();
    }, [category]);

    function fetchData() {
        if (category === 'movies') {
            setMedia(movies)
        } else if (category === 'series') {
            setMedia(series)
        }
    }

    useEffect(() => {
        const all_movies = Array(genres.length).fill([])
        const fetchMovies = async () => {
            for (let index in genres) {
                all_movies[index] = await dicoverMoviesAPI(genres[index])
            }
            setMovies(all_movies)
            localStorage.setItem('moviesData', JSON.stringify(all_movies));
        }

        const all_series = Array(genres.length).fill([])
        const fetchSeries = async () => {
            for (let index in series_genres) {
                all_series[index] = await dicoverSeriesAPI(series_genres[index])
            }
            setSeries(all_series)
            localStorage.setItem('seriesData', JSON.stringify(all_series));
        }

        if (movies[0].length === 0) {
            fetchMovies()
        }
         if (series[0].length === 0) {
            fetchSeries()
        }

    }, [category])


    if ((movies[0].length === 0 && category === "movies") ||
        (series[0].length === 0 && category === "series")) {
        return (
            <Loading/>
        )

    }

    return (
        <div>
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
            {category === "movies" && movies.map((movie_list, index) => (
                movie_list ? (
                    <>
                        <h2>{genres[index]}</h2>
                        <MediaList medias={movie_list}/>
                    </>
                ) : null
            ))}
            {category === "series" && series.map((series_list, index) => (
                series_list ? (
                    <>
                        <h2>{series_genres[index]}</h2>
                        <MediaList medias={series_list}/>
                    </>
                ) : null
            ))}
        </div>
    );
}

export default Discover;