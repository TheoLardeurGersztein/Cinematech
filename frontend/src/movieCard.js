import {Link} from "react-router-dom";

function MovieCard({ movie, source }) {
    return (
    <div key={movie.id} className="movie-card">
        <Link to={"/"}>
            <img src={movie.poster} alt={movie.title + " Poster"} className="movie-poster"/>
        </Link>
        <h2>{movie.title}</h2>
        <p>Release Year: {movie.release_date}</p>
    </div>
    );
}

function MovieList({ movies, source }) {
    return (
        <div className="movie-container">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

export default MovieList