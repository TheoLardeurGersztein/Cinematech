import MovieList from "./movieCard";
import React, {useEffect, useState} from "react";
import {downloadingMoviesAPI} from "./api";
import './Downloads.css'


function Downloads() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);

    function getMovies() {
        downloadingMoviesAPI()
            .then(res => {
                const moviesData = res.data;
                setMovies(moviesData);
            })
    }

    return (
         <div className="downloading-movie-table-container">
            <table className="downloading-movie-table">
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Download Percentage</th>
                        <th>Download Status</th>
                        <th>Downloaded From</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => (
                        <tr key={index}>
                            <td>{movie.title}</td>
                            <td>{movie.download_percentage}</td>
                            <td>{movie.download_status}</td>
                            <td>{movie.downloaded_from}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default Downloads