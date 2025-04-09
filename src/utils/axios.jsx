    import axios from "axios";
    import { API_CONFIG } from "../config";
    import store from "../store/index";

    const axiosServices = axios.create();
    // console.log("axios:", state.authReducer.access_token);

    // Set up a request interceptor to add the headers before request is sent
    axiosServices.interceptors.request.use(
    (config) => {
        const state = store.getState(); // Get the current state
        const access_token = state.authReducer.access_token;
        // const access_token = API_CONFIG.DEFAULT_API_TOKEN;

        console.log("access_token:", access_token);

        // Add Authorization header if it's not already present
        if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

    // Response interceptor
    axiosServices.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject((error.response && error.response.data) || "Wrong Services")
    );

    export default axiosServices;

    export const globalAxios = axios.create();