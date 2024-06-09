import {Link, useLocation, useNavigate} from 'react-router-dom';
import {dicoverMoviesAPI, downloadMovie, getSeriesAPI, getSeriesTmdbAPI, torrentListAPI} from "./api";
import {useEffect, useState} from "react";


import './MovieDetails.css'

function SeriesDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const tmdb_id = location.state.tmdb_id
    const [series, setSeries] = useState()

    const handleGoBack = (event) => {
        event.stopPropagation();
        navigate(-1);
    };


    useEffect(() => {
        getSeriesTmdbAPI(tmdb_id)
            .then(res => {
                const seriesData = res.data;
                setSeries(seriesData);
            })
    }, []);


    return (

        <div className="detailed-movie-container">
            {series && (
                <div className="detailed-movie-info">
                    <div className="movie-details">
                        <h1 className="movie-title">{series.title}</h1>
                        <p className="release-year">{series.first_air_date}</p>
                        <p>{series.synopsis}</p>
                        <p className="release-year">Seasons : {series.number_of_seasons}</p>
                        <p className="release-year">Episodes : {series.number_of_episodes}</p>

                    </div>
                    <div className="movie-poster-container">
                        <img className="movie-poster" src={series.poster} alt={series.name + " Poster"}/>
                    </div>
                </div>
            )}
            <div className="button-container">
                <button className="button" onClick={handleGoBack}>Go back</button>
            </div>
        </div>
    );
}

export default SeriesDetails