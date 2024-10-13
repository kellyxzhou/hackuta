"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useSound from "use-sound";

interface TextBoxProps {
    userText: { transcription: string }[];
    aiText: string[];
}

const TextBox: React.FC<TextBoxProps> = ({ userText, aiText }) => {
    useEffect(() => {
        console.log("User Text: ", userText);
        console.log("AI Text: ", aiText);
    }, [userText]);

    const [playActive] = useSound(`/speech.mp3?v=${new Date().getTime()}`, {
        volume: 1,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            playActive();
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => clearTimeout(timer);
    }, [aiText, playActive]); // Include aiText in the dependency array

    return (
        <div className="border-2 w-5/6 border-grey rounded-xl p-4 shadow-xl mx-16 text-gray-800">
            <div className="flex items-center ml-3 mt-3">
                <Image src="/Logo.png" width={30} height={20} alt="logo" />
                <div className="rounded-xl px-5 py-2 text-black">
                    {userText.length === 0
                        ? "Waiting for you to say something..."
                        : "Fluently"}
                </div>
            </div>
            {userText.map((userMessage, index) => (
                <React.Fragment key={index}>
                    <div className="bg-gray-100 ml-32 rounded-xl px-5 py-2 text-black mt-5">
                        {userMessage.transcription}
                    </div>
                    {aiText[index] && (
                        <div className="flex items-center ml-3 mt-5">
                            <Image
                                src="/Logo.png"
                                width={30}
                                height={20}
                                alt="logo"
                            />
                            <div className="rounded-xl px-5 py-2 text-black">
                                {aiText[index]}
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default TextBox;
