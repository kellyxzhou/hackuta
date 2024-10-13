"use client";
import React from "react";
import Navbar from "../components/navbar";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Spline from '@splinetool/react-spline';

const Home: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            <Navbar />
            <div className="absolute top-20 left-0 w-full h-full bg-white bg-opacity-80">
                <Spline
                    scene="https://prod.spline.design/OY2hEj9n7p3Itn2n/scene.splinecode"
                    className="absolute inset-0 -z-10 transform scale-125" // Adjust scale to make it larger
                />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-7xl text-primary font-semibold text-center mt-52 relative z-10"
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
                className="hover:bg-primary hover:text-white text-3xl font-bold py-2 px-4 rounded-full mt-28 mx-auto relative z-10"
            >
                Get Started
            </motion.button>
        </div>
    );
};

export default Home;
