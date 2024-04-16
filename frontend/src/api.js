import axios from 'axios';

const api_url = 'http://127.0.0.1:8000/api/'

export const getMoviesAPI = () => {
  return axios.get(api_url + 'lib/');
}

export const searchMovieAPI = (title) => {
  return axios.get(api_url + "search/?title=" + title)
}

export const dicoverMoviesAPI = () => {
  return axios.get(api_url + "discover/")
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
