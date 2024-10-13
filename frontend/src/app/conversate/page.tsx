"use client";
import React from "react";
import Visualizer from "../components/visualizer";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";
import AudioUploader from "../../../components/AudioUploader";

export default function page() {
    const [started, setStarted] = React.useState(false);

    return (
        <div>
            <Navbar />

            {started ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="bg-gray-900"></div>
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="flex justify-center w-full mt-5">
                            <AudioUploader />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold py-2 px-4 rounded-full mt-5 text-center">
                            Improve Your Pronunciation
                        </h1>
                        <p className="mt-2">
                            Our app analyzes your speech and provides
                            personalized feedback to help you pronounce words
                            correctly.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setStarted(true)}
                            className="hover:bg-primary hover:text-white text-2xl font-bold py-2 px-5 rounded-full mt-8 mx-auto text-center"
                        >
                            Start Conversation
                        </motion.button>
                    </div>
                </>
            )}
        </div>
    );
}
