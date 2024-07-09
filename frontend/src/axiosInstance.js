import axios from 'axios';
import {refreshAccessToken} from "./api";

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        const selectedProfile = localStorage.getItem('selectedProfile');
        if (selectedProfile) {
            config.headers['X-Profile-ID'] = selectedProfile;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
            try {
                await refreshAccessToken()
                return axiosInstance(originalRequest); // Retry the original request with the new access token.
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                //localStorage.removeItem('accessToken');
                //localStorage.removeItem('refreshToken');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error); // For all other errors, return the error as is.
    }
);


export default axiosInstance;