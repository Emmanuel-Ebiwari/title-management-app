import { mutate } from "swr";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const clearCache = () =>
    mutate(() => true, undefined, { revalidate: false });
