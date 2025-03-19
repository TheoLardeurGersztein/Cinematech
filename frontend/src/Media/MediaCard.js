import {useLocation, useNavigate} from "react-router-dom";
import './MediaCard.css'

function MediaCard({media}) {

    let navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;

    const getMediaDetails = () => {
        let mediaType = ''
        if (media.number_of_episodes) {
            mediaType = "series"
        } else {
            mediaType = "movies"
        }
        if (pathname === "/discover" || pathname === "/search") {
            if (mediaType === "series") {
                navigate(`${pathname}/series/details/`, {state: {tmdb_id: media.tmdb_id}});
            } else if (mediaType === "movies") {
                navigate(`${pathname}/movies/details/`, {state: {movie: media}});
            }
        } else if (pathname === "/lib" || pathname === "/home") {
            if (mediaType === "series") {
                navigate(`/lib/series/${media.id}`);
            } else if (mediaType === "movies") {
                navigate(`/lib/movies/${media.id}`);
            }
        } else if (pathname === "/downloadingMovies") {
            navigate(`/downloadingMovies/${media.id}`);
        }
    };


    return (
        <div className="media-card">
            <img
                className="media-poster"
                src={media.poster} alt={media.title + " Poster"}
                onClick={() => getMediaDetails()}
            />
        </div>
    );
}

export default MediaCard