import React, {useState, useEffect} from 'react';
import {getSeriesListAPI} from '../api';
import MovieList from "./MovieCard";

function Series() {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        getSeries();
    }, []);

    function getSeries() {
        getSeriesListAPI()
            .then(res => {
                const seriesData = res.data;
                setSeries(seriesData);
            })
    }

    return (
        <div>
            Hell
            <MovieList movies={series}/>
        </div>
    );
}

export default Series;