import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
    getProfileSeries,
    getSeriesAPI, getWatchedEpisode,
    getWatchedTimeEpisode,
    setWatchedTimeEpisode
} from "../api";
import "./SeriesViewer.css";

function SeriesViewer() {
    const [selectedSeason, setSelectedSeason] = useState(1);
    const videoRef = useRef(null);
    const { id } = useParams();
    const [series, setSeries] = useState({});
    const [url, setUrl] = useState('');
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [selectedEpisodes, setSelectedEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);

    const generateSeasons = (n) => Array.from({ length: n }, (_, i) => i + 1);
    const seasons = series.number_of_seasons ? generateSeasons(series.number_of_seasons) : [];


    const handleSeasonChange = (event, id) => {
        const newSelectedSeason = event.target.value;
        setSelectedSeason(newSelectedSeason);
        if (series) {
            const episodes = series.episodes?.filter(episode =>
                String(episode.season_number) === newSelectedSeason
            ) || [];
            setSelectedEpisodes(episodes);
        }
    };


    const getCorrectSeasonAndEpisode = async (all_episodes, current_season_number, current_episode_number) => {
        const current_season_episodes = all_episodes.filter(episode =>
            episode.season_number === current_season_number
        ) || [];
        const last_watched_episode = Object.values(current_season_episodes).find(episode => episode.episode_number === current_episode_number)
        const watched = await getWatchedEpisode(last_watched_episode.id)
        if (watched) {
            const is_new_season = (last_watched_episode.episode_number === current_season_episodes.length)
            if (is_new_season) {
                const last_season_number = all_episodes.reduce((max, episode) => {
                    return episode.season_number > max ? episode.season_number : max;
                }, 1);
                if (last_season_number === current_season_number) {
                    return [current_season_episodes, current_season_number, last_watched_episode]
                } else {
                    const next_season_episodes = all_episodes.filter(episode =>
                        episode.season_number === current_season_number + 1
                    ) || [];
                    const first_episode_next_season = Object.values(next_season_episodes).find(episode => episode.episode_number === 1)

                    return [next_season_episodes, current_season_number + 1, first_episode_next_season]
                }
            } else {
                const next_episode = Object.values(current_season_episodes).find(episode => episode.episode_number === Number(current_episode_number) + 1)
                return [current_season_episodes, current_season_number, next_episode]
            }
        } else {
            return [current_season_episodes, current_season_number, last_watched_episode]
        }
    }

    const setSeasonAndEpisode = (season_episodes, season_number, episode) => {
        setSelectedEpisodes(season_episodes);
        setSelectedSeason(season_number)
        setSelectedEpisodes(season_episodes);
        changeSelectedEpisode(episode)
    }


    useEffect(() => {
        const fetchSeries = async () => {
            try {
                setLoading(true); // Start loading
                const res = await getSeriesAPI(id);
                const responseProfileSeries = await getProfileSeries(id)
                const current_season = parseInt(responseProfileSeries.current_season)
                const current_episode_number = parseInt(responseProfileSeries.current_episode)
                const all_episodes = res.data.episodes;
                setSeries(res.data);
                if (all_episodes && responseProfileSeries) {
                    const [season_episodes, season_number, episode] = await getCorrectSeasonAndEpisode(all_episodes, current_season, current_episode_number)
                    await setSeasonAndEpisode(season_episodes, season_number, episode)
                }
            } catch (error) {
                console.error('Error fetching series:', error);
            } finally {
                setLoading(false); // End loading
            }
        };
        fetchSeries();
    }, [id]);

    useEffect(() => {
        const updateWatchedTime = async () => {
            if (videoRef.current && selectedEpisode) {
                await setWatchedTimeEpisode(selectedEpisode.id, parseInt(videoRef.current.currentTime));
            }
        };

        const intervalId = setInterval(updateWatchedTime, 5000);
        return () => clearInterval(intervalId);
    }, [selectedEpisode]);

    const changeSelectedEpisode = async (episode) => {
        setSelectedEpisode(episode);
        setUrl(`http://localhost:80/series/${encodeURIComponent(episode.file_path)}`);
        const time = await getWatchedTimeEpisode(episode.id)
        if (time) {
            videoRef.current.currentTime = time;
        }
    };


    if (loading) {
        return <div className="loading">Loading...</div>; // Show loading message or spinner
    }

    return (
        <div className="series-viewer">
            <div className="series-viewer-container">
                {series &&
                    <video className="movie-player" key={url} controls ref={videoRef}>
                        <source src={url} />
                    </video>
                }
            </div>
            <div>
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

                <div className="details-container">
                    <ul className="episode-list">
                        {selectedEpisodes && selectedEpisodes.map((episode) => (
                            <li onClick={() => changeSelectedEpisode(episode)}
                                className={selectedEpisode && episode === selectedEpisode ? 'selected' : ''}
                                key={episode.episode_number + episode.season_number * 100}>
                                S{episode.season_number}E{episode.episode_number}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SeriesViewer;
