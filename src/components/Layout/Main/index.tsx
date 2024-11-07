import React, { ReactNode } from "react";
// import localFont from "next/font/local";

interface DefaultLayoutProps {
    children: ReactNode;
}

// const geistSans = localFont({
//   src: "./fonts/",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const Main: React.FC<DefaultLayoutProps> = ({ children }) => (
    <main
        className="flex flex-col items-center justify-start flex-grow w-full h-full"
        style={{ height: "max-content" }}
    >
        {children}
    </main>
);

export default Main;
