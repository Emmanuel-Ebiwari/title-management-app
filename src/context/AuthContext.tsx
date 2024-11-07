// eslint-disable-entire-file no-unused-vars
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import { clearCache } from "@/utils";
import { useRouter } from "next/router";
import { isTokenExpired } from "@/services";
import { toast } from "sonner";

// interface User {
//     username: string;
//     email: string;
//     password?: string;
//     updatedAt: string;
//     createdAt: string;
//     deletedAt: string | null;
//     uuid: string;
// }

interface WalletInfo {
    accountId: string;
    ethBalance: string;
    isConnected: boolean;
}

interface AuthContextType {
    user: any | null;
    token: string | null;
    walletInfo: WalletInfo;
    logUserIn: (userData: any, tokenData: string | undefined) => Promise<void>;
    logoutUser: () => void;
    setUser: React.Dispatch<React.SetStateAction<any | null>>;
    saveWalletInfo: (walletInfo: WalletInfo) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const router = useRouter();
    const [user, setUser] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [walletInfo, setWalletInfo] = useState<WalletInfo>({
        accountId: "",
        ethBalance: "",
        isConnected: false,
    });

    useEffect(() => {
        const localStorageToken = window.localStorage.getItem("gp_token");
        if (
            window !== undefined &&
            router?.pathname === "/dashboard" &&
            !localStorageToken
        ) {
            window.location.href = "/";
        }
    }, [router?.pathname]);

    useEffect(() => {
        const token = localStorage.getItem("gp_token");
        if (
            window !== undefined &&
            router?.pathname === "/dashboard" &&
            isTokenExpired(token)
        ) {
            toast.error("Token expired, signin again")
            logoutUser();
            // window.location.href = "/signin"; // Redirect to login page if no valid token
        }
    }, [router?.pathname]);

    const logUserIn = async (userData: any, tokenData: string | undefined) => {
        delete userData.password;
        window.localStorage.setItem("gp_token", `${tokenData}`);
        window.localStorage.setItem("gp_user", JSON.stringify(userData));

        setUser(JSON.parse(window.localStorage.getItem("gp_user") as string));
        setToken(window.localStorage.getItem("gp_token"));
        router.push("/dashboard");
    };

    const saveWalletInfo = (walletInfo: WalletInfo) => {
        window.localStorage.setItem(
            "gp_wallet_info",
            JSON.stringify(walletInfo),
        );
        setWalletInfo(
            JSON.parse(window.localStorage.getItem("gp_wallet_info") as string),
        );
    };

    useEffect(() => {
        const storedUser = window.localStorage.getItem("gp_user");
        const storedToken = window.localStorage.getItem("gp_token");
        const storedWallet = window.localStorage.getItem("gp_wallet_info");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
        if (storedWallet) setWalletInfo(JSON.parse(storedWallet));
    }, []);

    const logoutUser = () => {
        clearCache();
        window.localStorage.removeItem("gp_user");
        window.localStorage.removeItem("gp_token");
        window.localStorage.removeItem("gp_wallet_info");
        window.location.href = "/";
    };

    const state: AuthContextType = {
        user,
        token,
        walletInfo,
        logUserIn,
        logoutUser,
        setUser,
        saveWalletInfo,
    };

    return (
        <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    );
};

export const useAuthState = (): AuthContextType => {
    const state = useContext(AuthContext);

    if (!state) {
        throw new Error(
            "useAuthState must be used within an AuthContextProvider",
        );
    }

    return state;
};
