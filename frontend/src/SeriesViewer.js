import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMovieAPI, getSeriesAPI} from "./api";
import "./SeriesViewer.css"


function SeasonSelector({seasons, onSeasonChange}) {
    const [selectedSeason, setSelectedSeason] = useState('1');

    const handleSeasonChange = (event) => {
        const selectedSeason = event.target.value;
        setSelectedSeason(selectedSeason);
        onSeasonChange(selectedSeason);
    };

    return (
        <div className="season-selector">
            <label htmlFor="season">Select a Season:</label>
            <select id="season" value={selectedSeason} onChange={handleSeasonChange}>
                {seasons.map((season) => (
                    <option key={season} value={season}>
                        Season {season}
                    </option>
                ))}
            </select>
        </div>
    );
}


function SeriesViewer() {

    const {id} = useParams();
    const [series, setSeries] = useState([]);
    const [url, setUrl] = useState('');
    const [selectedEpisode, setSelectedEpisode] = useState('');
    const [selectedEpisodes, setSelectedEpisodes] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state


    const handleSeasonChange = (selectedSeason) => {
        if (series) {
            if (selectedSeason === 0) {
                return episodes
            }
            const episodes = series.episodes.filter(episode => {
                return String(episode.season_number) === selectedSeason;
            });
            setSelectedEpisodes(episodes)
        }
    };


    useEffect(() => {
        const fetchSeries = async () => {
            try {
                setLoading(true); // Start loading
                const res = await getSeriesAPI(id);
                const serieData = res.data;
                setSeries(serieData);
                handleSeasonChange(1);
            } catch (error) {
                console.error('Error fetching series:', error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchSeries();

    }, []);

    function changeSelectedEpisode(episode) {
        setSelectedEpisode(episode['episode_number'])
        console.log(selectedEpisode)
        setUrl(`http://localhost:80/series/${encodeURIComponent(episode.file_path)}`);
    }

    const generateSeasons = (n) => Array.from({length: n}, (_, i) => i);


    if (loading) {
        return <div className="loading">Loading...</div>; // Show loading message or spinner
    }


    return (
        <div className="series-viewer-container">
            {series &&
                <div className="movie-viewer-container">
                    <video className="movie-player" key={url} controls>
                        <source src={url}/>
                    </video>
                </div>
            }
            <div className="details-container">
                <SeasonSelector
                    seasons={generateSeasons(series.number_of_seasons)}
                    onSeasonChange={handleSeasonChange}
                />
                <ul className="episode-list">
                    {selectedEpisodes.map((episode) => (
                        // eslint-disable-next-line no-undef
                        <li onClick={() => changeSelectedEpisode(episode)}
                            key={episode.episode_number}>
                            Episode {episode.episode_number}: {episode.file_path}
                        </li>
                    ))}
                </ul>

            </div>
        </div>

    );
}


export default SeriesViewer