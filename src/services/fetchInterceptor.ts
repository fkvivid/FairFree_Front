import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "https://testapi.xcodestest.net",
    timeout: 60000,
    maxBodyLength: Infinity,
});

const AUTH_TOKEN = "auth_token";

// API Request interceptor
service.interceptors.request.use((config) => {
    const bearerToken = localStorage.getItem(AUTH_TOKEN) || null;

    if (bearerToken) {
        config.headers["Authorization"] = `Bearer ${bearerToken}`;
    }

    return config;
});

export { service };
