import React, {useState, useEffect} from 'react';
import {getContinueWatchingList, getMoviesAPI, getSeriesListAPI} from '../api';
import MediaList from "./MediaCard";
import './CategoryChoice.css'


function Library() {

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [continueWatchingList, setContinueWatchingList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const movies = await getMoviesAPI()
            setMovies(movies.data)
            const series = await getSeriesListAPI()
            setSeries(series.data)
            const continueWatchingList = await getContinueWatchingList()
            setContinueWatchingList(continueWatchingList)
        }
        fetchData();
    }, []);


    return (
        <div>
            <h2>Movies</h2>
            <MediaList medias={movies}/>
            <h2>Series</h2>
            <MediaList medias={series}/>
            {continueWatchingList.length > 0 &&
                <>
                    <h2>Continue watching</h2>
                    <MediaList medias={continueWatchingList}/>
                </>}
        </div>
    );
}

export default Library;