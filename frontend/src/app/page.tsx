"use client";
import React from "react";
import Navbar from "../components/navbar";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-7xl text-primary font-semibold text-center mt-52"
            >
                <TypeAnimation
                    sequence={[
                        "Welcome to Fluently",
                        2000,
                        "Improve your pronunciation",
                        2000,
                        "Speak with confidence",
                        2000,
                    ]}
                    repeat={Infinity}
                />
            </motion.div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("/conversate")}
                className="hover:bg-primary hover:text-white text-3xl font-bold py-2 px-4 rounded-full mt-28 mx-auto"
            >
                Get Started
            </motion.button>
        </div>
    );
};

export default Home;
