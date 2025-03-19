import MediaCard from "./MediaCard";
import './MediaCard.css'


function MediaLib( {medias}) {
    return (
        <div className="media-container">
            {medias.map(media => (
                <MediaCard key={media.title} media={media}/>
            ))}
        </div>
    )
}

export default MediaLib