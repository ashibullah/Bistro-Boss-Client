import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://bistro-server-ashen.vercel.app',
    withCredentials: true, // for cookies if needed
});