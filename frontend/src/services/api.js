import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' && window.location.origin === 'http://localhost:5173' ? 'http://localhost:5000/api' : '/api');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Attach Authorization Bearer token header if present
const getAuthHeaders = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

export const submitContactForm = async (formData) => {
    const response = await api.post('/contact', formData);
    return response.data;
};

export const adminLogin = async (username, password) => {
    const response = await api.post('/admin/login', { username, password });
    return response.data;
};

export const adminSignup = async (username, password) => {
    const response = await api.post('/admin/signup', { username, password });
    return response.data;
};

export const fetchMessages = async (token, page = 1, search = '', limit = 10) => {
    const response = await api.get(`/admin/messages?page=${page}&search=${search}&limit=${limit}`, getAuthHeaders(token));
    return response.data;
};

export const deleteMessage = async (token, id) => {
    const response = await api.delete(`/admin/messages/${id}`, getAuthHeaders(token));
    return response.data;
};
