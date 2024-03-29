import React, { useState, useEffect } from 'react';
import { dicoverMoviesAPI } from './api';
import axios from 'axios';
import './library.css';

function Discover() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  function getMovies() {
    dicoverMoviesAPI()
        .then(res => {
        const moviesData = res.data;
        setMovies(moviesData);
      })
  }

  return (
    <div>
      {movies.map(movie => (
        <p>{movie.title}</p>
      ))}
    </div>
  );
}

export default Discover;