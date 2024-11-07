import { makeRequest } from "./axiosInstance";

interface CreateTitleData {
    title: string;
    description: string;
}

export const createTitle = async (data: CreateTitleData): Promise<unknown> => {
    try {
        const response = await makeRequest<unknown>({
            method: "POST",
            url: "/title",
            data,
        });

        return response;
    } catch (error) {
        console.error("Sign-up error:", error);
        throw error;
    }
};

// export const getTitles = async (): Promise<unknown> => {
//     const response = await makeRequest<unknown>({
//         method: "GET",
//         url: `/`,
//     });
//     return response;
// };

export const deleteTitles = async (id: string): Promise<unknown> => {
    try {
        const response = await makeRequest<unknown>({
            method: "DELETE",
            url: `/title/${id}`,
        });
        return response;
    } catch (error) {
        console.error("Sign-in error:", error);
        throw error;
    }
};
