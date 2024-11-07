import React, { Fragment } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/MainLayout";
import NavigationLoader from "@/components/Helper/NavigationLoader";
import { SWRConfig } from "swr";
import { fetcher } from "@/services";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export default function App({ Component, pageProps, router }: AppProps) {
    const noLayoutPages = ["/signin", "/signup", "/reset_password"];

    const renderLayout = !noLayoutPages.includes(router?.pathname);
    const LayoutComponent = renderLayout ? Layout : Fragment;

    return (
        <AuthContextProvider>
            <SWRConfig
                value={{
                    fetcher: fetcher,
                }}
            >
                <LayoutComponent>
                    <Toaster position="top-right" />
                    <NavigationLoader />
                    <Component {...pageProps} />
                </LayoutComponent>
            </SWRConfig>
        </AuthContextProvider>
    );
}
