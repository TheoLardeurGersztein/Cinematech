import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './library.css';

function Library() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  function getMovies() {
    axios.get('http://127.0.0.1:8000/api/movies/')
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