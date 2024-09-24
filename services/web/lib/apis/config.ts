import { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
    headers: {
        "content-type": "application/json",
    },
};

import axios from "axios";
export default axios.create({
    headers: { "Content-Type": "application/json" },
});

export const axiosAuth = axios.create({
    headers: { "Content-Type": "application/json" },
});
