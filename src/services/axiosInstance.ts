import axios from "axios";
import { baseUrl } from "@/utils";

const axiosInstance = axios.create({
    baseURL: baseUrl || "http://localhost:8000/api/v1",
    headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("gp_token");
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
});

interface RequestOptions {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    url: string;
    data?: unknown;
    params?: unknown;
    headers?: Record<string, string>;
}

export const makeRequest = async <T = unknown>(
    options: RequestOptions,
): Promise<T> => {
    const response = await axiosInstance({
        method: options.method,
        url: options.url,
        data: options.data,
        params: options.params,
        headers: options.headers,
    });
    return response.data as T;
};
