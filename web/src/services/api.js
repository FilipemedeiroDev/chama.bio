
import axios from 'axios';
import { getItem } from '../utils/cookies';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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