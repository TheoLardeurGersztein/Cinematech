import React, { useState, useEffect } from 'react';
import { dicoverMoviesAPI } from './api';
import MovieList from './movieCard';
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
      <MovieList movies={movies} />
    </div>
  );
}

export default Discover;