import axios from "axios";

// Axios Interceptor Instance
const AxiosAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api',
});

AxiosAuth.interceptors.request.use(
    (config) => {
        // if (typeof window !== "undefined") {
        //     const token = localStorage?.getItem('token') as string;
        //     const accessToken = JSON.parse(token);
        //     if (accessToken) {
        //         if (config.headers) config.headers.token = accessToken;
        //     }
        //     return config;
        // }
        return config
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Axios Interceptor: Response Method
AxiosAuth.interceptors.response.use(
    (response) => {
        // Can be modified response
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);


export default AxiosAuth