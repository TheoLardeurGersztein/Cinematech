import axios from 'axios';
import axiosInstance from "./axiosInstance";

const api_url = 'http://127.0.0.1:8000/api/'

export const getMoviesAPI = () => {
    return axios.get(api_url + 'lib/movies/');
}

export const getMovieAPI = async (movieId) => {
    return axios.get(api_url + 'lib/movies/' + movieId + '/');
}

export const searchMovieAPI = (title) => {
    return axios.get(api_url + "movies/search/?title=" + title)
}

export const searchSeriesAPI = (title) => {
    return axios.get(api_url + "series/search/?title=" + title)
}

export const dicoverMoviesAPI = async (genre) => {
    if (genre) {
        const response = await axios.get(api_url + "movies/discover/?genre=" + genre)
        return response.data
    } else {
        const response = await axios.get(api_url + "movies/discover/")
        return response.data

    }
}

export const dicoverSeriesAPI = async (genre) => {
    if (genre) {
        console.log(genre)
        const response = await axios.get(api_url + "series/discover/?genre=" + encodeURIComponent(genre))
        return response.data
    } else {
        const response = await axios.get(api_url + "series/discover/")
        return response.data
    }
}


export const torrentListAPI = (title, year) => {
    return axios.get(api_url + "torrent/?title=" + title + "&year=" + year)
}

export const downloadMovie = (body) => {
    return axios.post(api_url + "downloads/", body)
}

export const downloadingMoviesAPI = () => {
    return axios.get(api_url + "downloads/")
}

export const getSeriesListAPI = () => {
    return axios.get(api_url + "lib/series/")
}

export const getSeriesAPI = (seriesId) => {
    return axios.get(api_url + 'lib/series/' + seriesId + '/');
}

export const getSeriesTmdbAPI = (seriesId) => {
    return axios.get(api_url + 'tmdb/series/' + seriesId + '/');
}

export const getAccountToken = async (body) => {
    const response = await axiosInstance.post(api_url + "account/token/", body)
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.removeItem('selectedProfile');
    return response;
}

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await axiosInstance.post(api_url + "account/token/refresh/", { refresh: refreshToken })
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
}

export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('selectedProfile');
};

export const getAccountInfoAPI = async () => {
    try {
        const response = await axiosInstance.get(api_url + "account/info/");
        return response.data;
    } catch (error) {
        if (error.response) {
            return null
        } else {
            throw error;
        }
    }
}

export const getProfileInfoAPI = async () => {
    try {
        const response = await axiosInstance.get(api_url + "profiles/");
        return response.data;
    } catch (error) {
        if (error.response) {
            return null
        } else {
            throw error;
        }
    }
}

export const getAccountIdAPI = async () => {
    try {
        const response = await axiosInstance.get(api_url + "account/info/");
        return response.data.id;
    } catch (error) {
        if (error.response) {
            return null
        } else {
            throw error;
        }
    }
}

export const getProfilesAPI = () => {
    localStorage.removeItem('selectedProfile');
    return axiosInstance.get(api_url + 'account/profiles/');
}

export const setProfile = (profileId) => {
    localStorage.setItem('selectedProfile', profileId);
}

export const addProfileAPI = async (name) => {
    const response = await axiosInstance.post(api_url + "profiles/", {
        name: name
    })
    return response;
}

export const renameProfileAPI = async (profileId, name) => {
    const response = await axiosInstance.put(api_url + "profiles/" + profileId + "/", {
        name: name
    })
    return response;
}

export const removeProfileAPI = async (profileId, name) => {
    const response = await axiosInstance.delete(api_url + "profiles/" + profileId + "/", {
        name: name
    })
    return response;
}





export const setWatchedTimeMovie = async (movieId, watched_time) => {
    const selectedProfile = localStorage.getItem('selectedProfile');
    return axios.post(api_url + "profilemovie/" + selectedProfile + '/' + movieId + '/', {
        watched_time: watched_time,
        movie: movieId,
        profile: selectedProfile
    })
}

export const getWatchedTimeMovie = async (movieId) => {
    try {
        const selectedProfile = localStorage.getItem('selectedProfile');
        const response = await axios.get(api_url + "profilemovie/" + selectedProfile + '/' + movieId + '/')
        return response.data.watched_time
    } catch (error) {
        if (error.response) {
            return null
        } else {
            throw error;
        }
    }
}


export const setWatchedTimeEpisode = async (episode_id, watched_time) => {
    const selectedProfile = localStorage.getItem('selectedProfile');
    return axios.post(api_url + "profileepisode/" + selectedProfile + '/' + episode_id + '/', {
        watched_time: watched_time,
        episode: episode_id,
        profile: selectedProfile
    })
}


export const getWatchedTimeEpisode = async (episode_id) => {
    try {
        const selectedProfile = localStorage.getItem('selectedProfile');
        const response = await axios.get(api_url + "profileepisode/" + selectedProfile + '/' + episode_id + '/')
        return response.data.watched_time
    } catch (error) {
        return null
    }
}

export const getWatchedEpisode = async (episode_id) => {
    try {
        const selectedProfile = localStorage.getItem('selectedProfile');
        const response = await axios.get(api_url + "profileepisode/" + selectedProfile + '/' + episode_id + '/')
        return response.data.watched
    } catch (error) {
        return null
    }
}


export const getContinueWatchingList = async () => {
    try {
        const selectedProfile = localStorage.getItem('selectedProfile');
        const response = await axios.get(api_url + "profiles/" + selectedProfile + '/continuewatching/')
        return response.data
    } catch (e) {
        return null

    }
}

export const getProfileSeries = async (series_id) => {
    try {
        const selectedProfile = localStorage.getItem('selectedProfile');
        const response = await axios.get(api_url + "profileseries/" + selectedProfile + '/' + series_id + '/')
        return response.data
    } catch (e) {
        console.log(e)
    }
}


