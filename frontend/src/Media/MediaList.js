import {useEffect, useRef, useState} from "react";
import MediaCard from "./MediaCard";

function MediaList({ medias: medias }) {
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