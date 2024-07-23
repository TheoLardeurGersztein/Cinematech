import {useLocation, useNavigate} from "react-router-dom";
import './MovieCard.css'

function MovieCard({movie, mediaType}) {

    let navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;

    const getMovieDetails = () => {
        if (pathname === "/discover" || pathname === "/search") {
            if (mediaType === "series") {
                navigate(`${pathname}/series/details/`, {state: {tmdb_id: movie.tmdb_id}});
            } else if (mediaType === "movies") {
                navigate(`${pathname}/movies/details/`, {state: {movie}});
            }
        } else if (pathname === "/lib") {
            if (mediaType === "series") {
                navigate(`/lib/series/${movie.id}`);
            } else if (mediaType === "movies") {
                navigate(`/lib/movies/${movie.id}`);
            }
        } else if (pathname === "/downloadingMovies") {
            navigate(`/downloadingMovies/${movie.id}`);
        }
    };


    return (
        <div key={movie.id}
             className="movie-card"
             onClick={() => getMovieDetails({movie})}>
            <img src={movie.poster} alt={movie.title + " Poster"} className="movie-poster"/>
            <h3 className="movie-title">{movie.title}</h3>
            <p className="release-year">{movie.release_date}</p>
        </div>
    );
}

function MovieList({movies, mediatype: mediaType}) {

    //console.log(movies)
    return (
        <div className="movie-container">
            {movies.map(movie => (
                <MovieCard key={movie.title} movie={movie} mediaType={mediaType}/>
            ))}
        </div>
    );
}

export default MovieList