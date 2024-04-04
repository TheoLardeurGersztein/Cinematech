import {useLocation, useNavigate} from 'react-router-dom';

function MovieDetails() {

    const navigate = useNavigate();

    const handleGoBack = (event) => {
        event.stopPropagation();
        navigate(-1);
    };

    const location = useLocation();
    const {movie} = location.state

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.synopsis}</p>
            <div>
                <img src={movie.poster} alt={movie.title + " Poster"} className="movie-poster"/>
            </div>
            <button onClick={handleGoBack}>Go back</button>
        </div>

    );
}

export default MovieDetails