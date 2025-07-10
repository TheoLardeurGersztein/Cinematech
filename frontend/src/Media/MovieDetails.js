import { useLocation, useNavigate } from 'react-router-dom';
import { downloadMovie, torrentListAPI } from "../api";
import { useEffect, useState } from "react";


import './MovieDetails.css'

function MovieDetails() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    const handleGoBack = (event) => {
        event.stopPropagation();
        navigate(-1);
    };

    const location = useLocation();
    const { movie } = location.state

    return (


        <div className="detailed-movie-container">

            <div className="detailed-movie-info">

                <div className="movie-details">
                    <h2 className="movie-title">{movie.title}</h2>
                    <p className="release-year">{movie.release_date}</p>
                    <p>{movie.synopsis}</p>
                </div>

                <div className="movie-poster-container">
                    <img className="movie-poster" src={movie.poster} alt={movie.title + " Poster"} />
                </div>

            </div>

            <div className="button-container">
                <button className="button" onClick={handleGoBack}>Go back</button>
            </div>

        </div>

    );
}

export default MovieDetails