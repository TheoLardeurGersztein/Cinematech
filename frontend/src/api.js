import axios from 'axios';

const api_url = 'http://127.0.0.1:8000/api/'

export const getMoviesAPI = () => {
  return axios.get(api_url + 'lib/movies/');
}

export const getMovieAPI = (movieId) => {
  return axios.get(api_url + 'lib/movies/' + movieId + '/');
}

export const searchMovieAPI = (title) => {
  return axios.get(api_url + "movies/search/?title=" + title)
}

export const searchSeriesAPI = (title) => {
  return axios.get(api_url + "series/search/?title=" + title)
}

export const dicoverMoviesAPI = () => {
  return axios.get(api_url + "movies/discover/")
}

export const dicoverSeriesAPI = () => {
  return axios.get(api_url + "series/discover/")
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
