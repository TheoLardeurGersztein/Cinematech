import React, { useState, useEffect } from 'react';
import { getMoviesAPI } from './api';
import axios from 'axios';
import './library.css';

function Library() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  function getMovies() {
    getMoviesAPI()
        .then(res => {
        const moviesData = res.data;
        setMovies(moviesData);
      })
  }

  return (
    <div>
      {movies.map(movie => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
}

export default Library;