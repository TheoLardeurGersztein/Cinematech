import {Link, useLocation, useNavigate} from 'react-router-dom';
import {downloadMovie, torrentListAPI} from "./api";
import {useEffect, useState} from "react";


import './MovieDetails.css'

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


        <div className="detailed-movie-container">


            <div className="detailed-movie-info">

                <div className="movie-details">
                    <h1 className="movie-title">{movie.title}</h1>
                    <p className="release-year">{movie.release_date}</p>
                    <p>{movie.synopsis}</p>
                </div>

                <div className="movie-poster-container">
                    <img className="movie-poster" src={movie.poster} alt={movie.title + " Poster"}/>
                </div>

            </div>

            <div className="torrent-table">
                {loading ? (
                    <p>Loading in progress</p>
                ) : torrents.length > 0 ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Quality</th>
                            <th>Seeds</th>
                            <th>Peers</th>
                            <th>Size</th>
                            <th>Date Uploaded</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {torrents.map((torrent, index) => (
                            <tr key={index}>
                                <td>{torrent.title}</td>
                                <td>{torrent.quality}</td>
                                <td>{torrent.seeds}</td>
                                <td>{torrent.peers}</td>
                                <td>{torrent.size}</td>
                                <td>{torrent.date_uploaded}</td>
                                <td>
                                    <img className="download-icon" src={"download-icon.png"} alt="Download"
                                         onClick={() => downloadMovie(
                                             {
                                                 'movie': movie,
                                                 'download': {
                                                     'title' : movie.title,
                                                     'url': torrent.url,
                                                     'hash': torrent.hash
                                                 }
                                             }
                                         )}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No torrents available</p>
                )}
            </div>


            <div className="button-container">
                <button className="button" onClick={handleGoBack}>Go back</button>
            </div>

        </div>

    )
        ;
}

export default MovieDetails