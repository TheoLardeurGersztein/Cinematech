import {useLocation, useNavigate} from "react-router-dom";
import './MediaCard.css'
import {useEffect, useRef, useState} from "react";

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
        } else if (pathname === "/lib") {
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

function MediaList({ medias: medias, mediatype: mediaType }) {
    const listRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
        if (listRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        updateScrollState(); // Initial check

        const listElement = listRef.current;
        if (listElement) {
            listElement.addEventListener('scroll', updateScrollState);
        }
        window.addEventListener('resize', updateScrollState); // Re-check on window resize

        return () => {
            if (listElement) {
                listElement.removeEventListener('scroll', updateScrollState);
            }
            window.removeEventListener('resize', updateScrollState);
        };
    }, [medias]);

    const scrollLeft = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: -800, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: 800, behavior: 'smooth' });
        }
    };

    return (
        <div className="slider-controls">
            {canScrollLeft && (
                <button className="slider-button left" onClick={scrollLeft}></button>
            )}
            <div className="media-list" ref={listRef}>
                {medias.map((media) => (
                    <MediaCard key={media.title} media={media} />
                ))}
            </div>
            {canScrollRight && (
                <button className="slider-button right" onClick={scrollRight}></button>
            )}
        </div>
    );
}

export default MediaList