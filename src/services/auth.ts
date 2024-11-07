import { makeRequest } from "./axiosInstance";
import { jwtDecode } from "jwt-decode";

interface RegisterAuthData {
    username: string;
    email: string;
    password: string;
}

interface LoginAuthData {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: any;
}

interface RegisterResponse {
    user: object;
}

interface LoginResponse {
    token: string;
}

export const signUp = async (data: RegisterAuthData): Promise<AuthResponse> => {
    try {
        await makeRequest<RegisterResponse>({
            method: "POST",
            url: "/auth/register",
            data,
        });

        const { token } = await makeRequest<LoginResponse>({
            method: "POST",
            url: "/auth/login",
            data: {
                email: data.email,
                password: data.password,
            },
        });
        // console.log("response: ", response);
        // console.log("loginResponse: ", loginResponse);
        const user = jwtDecode(token);
        return { token, user };
    } catch (error) {
        console.error("Sign-up error:", error);
        throw error;
    }
};

export const signIn = async (data: LoginAuthData): Promise<AuthResponse> => {
    try {
        const { token } = await makeRequest<LoginResponse>({
            method: "POST",
            url: "/auth/login",
            data,
        });

        const user = jwtDecode(token);
        return { token, user };
    } catch (error) {
        console.error("Sign-in error:", error);
        throw error;
    }
};
