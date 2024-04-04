import {Link, useNavigate} from "react-router-dom";
import './movieCard.css'

function MovieCard({movie}) {
    let navigate = useNavigate();


    return (
        <div key={movie.id}
             className="movie-card"
             onClick={() => navigate("/details", {state: {movie}})}>
            <img src={movie.poster} alt={movie.title + " Poster"} className="movie-poster"/>
            <h2>{movie.title}</h2>
            <p>Release Year: {movie.release_date}</p>
        </div>
    );
}

function MovieList({movies}) {
    return (
        <div className="movie-container">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
}

export default MovieList