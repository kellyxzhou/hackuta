"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useEffect } from "react";

const Navbar: React.FC = () => {
    const { user, error, isLoading } = useUser();

    useEffect(() => {
        console.log("User", user);
    }, []);

    return (
        <nav className="bg-white shadow-md text-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src="/Logo.png" alt="PronunFix" className="w-8 h-10" />
                <h1 className="text-xl font-bold">PronunFix</h1>
                <div className="space-x-4">
                    <Link href="/" className="hover:text-green-400">
                        Home
                    </Link>
                    <Link href="/resources" className="hover:text-green-400">
                        Resources
                    </Link>
                    <Link href="/login" className="hover:text-green-400">
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
