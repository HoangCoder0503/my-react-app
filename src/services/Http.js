import axios from "axios";
import { BASE_API } from "../shared/constants/app";
import store from "../redux-setup/store";
import { refreshToken } from "./Api";
import { updateAccessToken } from "../redux-setup/reducers/auth";
const Http = axios.create({
    baseURL: BASE_API,
    withCredentials: true,
});

Http.interceptors.request.use(
    async (config) => {
        const accessToken = await store.getState().Auth.login.currentCustomer?.accessToken;
        if (accessToken) {
            // Gui Token len server thong qua headers
            config.headers["token"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    async (error) => {
        Promise.reject(error);
    },

);
Http.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        const response = error.response;
        if (response.data === "Token expired") {
            if (response.config.url.indexOf("/customer/refreshtoken") >= 0) // de chay 1 lan API Refresh
                return Promise.reject(error);
            const data = (await refreshToken()).data;
            const newAccessToken = data.accessToken;
            store.dispatch(updateAccessToken({ newAccessToken }));
            response.config.headers["token"] = `Bearer ${newAccessToken}`;
            return Http(response.config); // trả lại thằng config cho HTTP
        }
        return Promise.reject(error);
    },
);
export default Http;