import {Link, useLocation, useNavigate} from "react-router-dom";
import './movieCard.css'

function MovieCard({movie}) {
    let navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;


    const getMovieDetails = () => {
        if (pathname === "/discover" || pathname === "/search") {
            // Send to details page with movie object
            navigate("/details", {state: {movie}});
        } else if (pathname === "/movies") {
            // Redirect to movie details page with id
            navigate(`/movies/${movie.id}`);
        } else if (pathname === "/downloadingMovies") {
            // Redirect to downloading movie details page with id
            navigate(`/downloadingMovies/${movie.id}`);
        }
    };


    return (
        <div key={movie.id}
             className="movie-card"
             onClick={getMovieDetails}>
            <img src={movie.poster} alt={movie.title + " Poster"} className="movie-poster"/>
            <h3 className="movie-title">{movie.title}</h3>
            <p className="release-year">{movie.release_date}</p>
        </div>
    );
}

function MovieList({movies}) {
    return (
        <div className="movie-container">
            {movies.map(movie => (
                <MovieCard key={movie.title} movie={movie}/>
            ))}
        </div>
    );
}

export default MovieList