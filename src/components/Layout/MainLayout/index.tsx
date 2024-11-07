import React, { ReactNode } from "react";
// import Header from "@/components/Layout/Header";
import Main from "@/components/Layout/Main";
import Footer from "@/components/Layout/Footer";
import DashboardHeader from "../Header/DashboardHeader";
import { useAuthState } from "@/context/AuthContext";
import Header from "../Header";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    const { token } = useAuthState();
    return (
        <div className="z-0 flex flex-col items-center w-full h-full">
            {token ? <DashboardHeader /> : <Header />}

            <Main>{children}</Main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
