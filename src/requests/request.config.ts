import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function get(url: string, options = {}) {
    return axios.get(`${baseUrl}${url}`, options);
}

export async function post(url: string, data = {}, options = {}) {
    return axios.post(`${baseUrl}${url}`, data, options);
}