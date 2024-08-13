import "./MovieViewer.css";
import {useEffect, useRef, useState} from "react";
import {getMovieAPI, getWatchedTimeEpisode, getWatchedTimeMovie, setWatchedTimeMovie} from "../api";
import {useParams} from "react-router-dom";

function MovieViewer() {
    const videoRef = useRef(null);

    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [url, setUrl] = useState(null);


    useEffect(() => {
        const getAndSetMovie = async (id) => {
            const response = await getMovieAPI(id)
            setMovie(response.data)
            setUrl(`http://localhost:80/movies/${encodeURIComponent(response.data.file_path)}`);
            const time = await getWatchedTimeMovie(response.data.id)
            if (time) {
                videoRef.current.currentTime = time;
            }
        }
        getAndSetMovie(id)
    }, []);

    useEffect(() => {
        if (movie) {
        }
    }, []);


    useEffect(() => {
        const updateWatchedTime = async () => {
            if (videoRef.current) {
                if (movie) {
                    await setWatchedTimeMovie(movie.id, parseInt(videoRef.current.currentTime))
                }
            }
        };
        const intervalId = setInterval(updateWatchedTime, 5000);
        return () => clearInterval(intervalId);
    }, [videoRef, movie]);

    if (!movie) {
        return <div>Loading movie...</div>;
    } else
        return (
            <div className="movie-viewer-container">
                <video className="movie-player" controls ref={videoRef}>
                    <source src={url}/>
                </video>
            </div>
        );
}

export default MovieViewer