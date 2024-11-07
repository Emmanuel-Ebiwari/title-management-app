import { mutate } from "swr";

export const baseUrl = "http://localhost:8000/api/v1";

export const clearCache = () =>
    mutate(() => true, undefined, { revalidate: false });
