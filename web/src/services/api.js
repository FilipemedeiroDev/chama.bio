
import axios from 'axios';
import { getItem } from '../utils/cookies';

const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use((config) => {
    const token = getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
});

export default instance;