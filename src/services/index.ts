import { jwtDecode } from "jwt-decode";
import { makeRequest } from "./axiosInstance";

interface AuthResponse {
    token: string;
    user: object;
}

interface DecodedToken {
    uuid: string;
    iat: number;
    exp: number;
}

export const fetcher = async (url: string): Promise<AuthResponse> => {
    const response = await makeRequest<AuthResponse>({
        method: "GET",
        url,
    });
    return response;
};

// Function to check if the JWT is expired
export const isTokenExpired = (token: string | null) => {
    const myToken = token || "";
    const decodedToken: DecodedToken = jwtDecode(myToken);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decodedToken.exp < currentTime; // Return true if expired
};
