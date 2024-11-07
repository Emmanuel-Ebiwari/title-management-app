import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

const Header: FC = () => {
    const router = useRouter();
    return (
        <header className="bg-white shadow-sm w-full">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                    <Link href={"/"}>TitleChain</Link>
                </div>
                <div className="space-x-2">
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-black"
                        onClick={() => router.push("/signin")}
                    >
                        Log In
                    </Button>
                    <Button size="lg" onClick={() => router.push("/signup")}>
                        Sign Up
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
