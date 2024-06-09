import "./MovieViewer.css";
import {useEffect, useState} from "react";
import {getMovieAPI} from "./api";
import {useParams} from "react-router-dom";

function MovieViewer() {

    const {id} = useParams();
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        getMovie();
    }, []);

    function getMovie() {
        getMovieAPI(id)
            .then(res => {
                const movieData = res.data;
                setMovie(movieData);
            })
    }

    const url = `http://localhost:80/movies/${encodeURIComponent(movie.file_path)}`;
    console.log(url)

    if (!movie.file_path) {
        return <div>Loading movie...</div>;
    } else
        return (
            <div className="movie-viewer-container">
                <video className="movie-player" controls>
                    <source src={url}/>
                </video>
            </div>
        );
}

export default MovieViewer