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
                <main className="flex-grow p-5">
                    <section className="text-center mb-10">
                        <h2 className="text-3xl font-semibold">
                            Improve Your Pronunciation
                        </h2>
                        <p className="mt-2">
                            Our app analyzes your speech and provides
                            personalized feedback to help you pronounce words
                            correctly.
                        </p>
                    </section>
                    <section className="flex flex-col items-center mb-10">
                        <h2 className="text-3xl font-semibold">
                            Audio Visualizer
                        </h2>
                        <div className="flex justify-center w-full mt-5">
                            <AudioUploader />
                        </div>
                    </section>
                </main>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <h1 className="text-xl font-bold py-2 px-4 rounded-full mt-5 text-center">
                            Start a conversation with our AI and get feedback on
                            your pronunciation
                        </h1>
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
