"use client";
import React, { useRef } from "react";
import Navbar from "../../components/navbar";
import { motion } from "framer-motion";
import AudioUploader from "../../components/AudioUploader";
import TextBox from "../../components/TextBox";

export default function page() {
    const [started, setStarted] = React.useState(false);

    const topics = [
        "your favorite book or movie?",
        "a recent trip or vacation you enjoyed",
        "your favorite hobbies or activities",
        "the best meal you’ve ever had",
        "what you enjoy doing on weekends",
        "your go-to coffee or tea order",
        "a memorable childhood experience",
        "the last concert you attended",
        "your favorite season and why",
        "what's something new you've learned recently?",
    ];

    const getRandomTopic = () => {
        const randomIndex = Math.floor(Math.random() * topics.length);
        return topics[randomIndex];
    };

    return (
        <div>
            <Navbar />

            {started ? (
                <div className="flex flex-col items-center justify-start min-h-screen pt-10">
                    <h2 className="text-2xl font-bold mb-4">
                        Let's talk about{" "}
                        <span className="text-primary text-2xl">
                            {getRandomTopic()}
                        </span>{" "}
                        today
                    </h2>
                    <TextBox />
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                        <div className="flex justify-center w-full mt-5">
                            <AudioUploader />
                        </div>
                        <p className="text-base font-medium text-gray-700 mt-2 text-center">
                            Speak into the microphone
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center min-h-screen -mt-10">
                        <h1 className="text-2xl font-bold py-2 px-4 rounded-full mt-5 text-center">
                            Improve Your Pronunciation
                        </h1>
                        <p className="mt-2 text-center">
                            Our app analyzes your speech and provides
                            personalized feedback to help you pronounce words
                            correctly.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setStarted(true)}
                            className="hover:bg-primary hover:text-white underline decoration-primary decoration-4 underline-offset-4 text-2xl font-bold py-2 px-5 rounded-full mt-8 mx-auto text-center"
                        >
                            Start Conversation
                        </motion.button>
                    </div>
                </>
            )}
        </div>
    );
}
