import {useLocation} from "react-router-dom";
import "./MovieViewer.css";

function MovieViewer() {


    const location = useLocation();
    const {movie} = location.state

    return (
        <div className="movie-viewer-container">
            <video className="movie-player" controls>
                <source src={`http://localhost:80/stream/${encodeURIComponent(movie.file_path)}`} />
            </video>
        </div>
    );
}

export default MovieViewer