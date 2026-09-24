import axios, { Axios } from "axios";

const API_URL = 'https:// 192.168.11.102:3000';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})