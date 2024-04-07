import {useLocation, useNavigate} from 'react-router-dom';
import {torrentListAPI} from "./api";
import {useEffect, useState} from "react";

function MovieDetails() {

    const navigate = useNavigate();
    const [torrents, setTorrents] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        torrentListAPI(movie.title, movie.release_date)
            .then(res => {
                setTorrents(res.data);
                setLoading(false)
            })
    }, []);


    const handleGoBack = (event) => {
        event.stopPropagation();
        navigate(-1);
    };

    const location = useLocation();
    const {movie} = location.state

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.release_date}</p>

            <p>{movie.synopsis}</p>
            <div>
                <img src={movie.poster} alt={movie.title + " Poster"}/>
            </div>
            <button onClick={handleGoBack}>Go back</button>
            {loading ? (
                <p>Loading in progress</p>
                ) :
                torrents.length > 0 ? (
                <ul>
                    {torrents.map((torrent, index) => (
                        <li key={index}>
                            title: {torrent.title},
                            quality: {torrent.quality},
                            seeds: {torrent.seeds},
                            peers: {torrent.peers},
                            size: {torrent.size},
                            date_uploaded: {torrent.date_uploaded},
                            url: {torrent.url},
                            source: {torrent.source}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No torrents available</p>
            )}

        </div>

    );
}

export default MovieDetails