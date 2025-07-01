// src/utils/api.ts
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://unisphere-backend-b327.onrender.com/api',
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

export const fetchAllEvents = async () => {
    const res = await API.get('/events');
    return res.data;
};

export const fetchEventById = async (id: string) => {
    const res = await API.get(`/events/${id}`);
    return res.data;
};

export default API;
