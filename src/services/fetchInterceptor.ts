import axios from "axios";

const service = axios.create({
    // baseURL: "http://localhost:8080",
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: import.meta.env.DEV ? "http://localhost:8080" : "https://testapi.xcodestest.net",
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
