
import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_HOST}/api`;

const instance = axios.create({
    baseURL: apiUrl
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;






/*
import axios from "axios";

const apiUrl = `${import.meta.env.VITE_API_HOST}/api`;
console.log(apiUrl)
const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

export default instance;
*/