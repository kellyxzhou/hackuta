"use client";
import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@propelauth/nextjs/client";

const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

export default function page() {
    const { loading, user } = useUser();

    useEffect(() => {
        console.log("User", user);
    }, [user]);

    const router = useRouter();

    return (
        <div>
            <Navbar />
            <h1 className="text-2xl font-bold py-2 px-4 mt-5 ml-16">
                Hi, {user?.firstName}!
            </h1>
            <h1 className="text-2xl px-4 ml-16 mt-1 mb-6">
                Here are some targeted exercises for you:
            </h1>
            <div className="flex flex-wrap justify-center gap-10 py-10 mx-24 pb-2">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                        router.push(
                            `/phoneme?phoneme=sh&sentence1=She+sells+seashells&sentence2=on+the+seashore.&sentence3=She+surely+sells+them!&commonissues=sh-s`
                        )
                    }
                >
                    <Tilt
                        options={defaultOptions}
                        className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
                    >
                        "sh"
                    </Tilt>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                        router.push(
                            `/phoneme?phoneme=th&sentence1=The+thing+is&sentence2=that+they+think+it+is&sentence3=the+thing+they+think+it+is.&commonissues=th-f`
                        )
                    }
                >
                    <Tilt
                        options={defaultOptions}
                        className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
                    >
                        "th"
                    </Tilt>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                        router.push(
                            `/phoneme?phoneme=ch&sentence1=Chop+the+chicken&sentence2=before+you+chew+it.&sentence3=Chewing+chicken+is+fun.&commonissues=ch-sh`
                        )
                    }
                >
                    <Tilt
                        options={defaultOptions}
                        className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
                    >
                        "ch"
                    </Tilt>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                        router.push(
                            `/phoneme?phoneme=ng&sentence1=The+song+is+sung&sentence2=by+the+singer.&sentence3=The+singer+sings+the+song.&commonissues=ng-n`
                        )
                    }
                >
                    <Tilt
                        options={defaultOptions}
                        className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
                    >
                        "ng"
                    </Tilt>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                        router.push(
                            `/phoneme?phoneme=r&sentence1=Red+roses+are+beautiful.&sentence2=The+rabbit+ran+fast.&sentence3=She+rides+a+rollercoaster.&commonissues=l`
                        )
                    }
                >
                    <Tilt
                        options={defaultOptions}
                        className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
                    >
                        "r"
                    </Tilt>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                        router.push(
                            `/phoneme?phoneme=l&sentence1=The+lake+is+blue.&sentence2=The+lion+is+loud.&sentence3=The+light+is+on.&commonissues=r`
                        )
                    }
                >
                    <Tilt
                        options={defaultOptions}
                        className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
                    >
                        "l"
                    </Tilt>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                        router.push(
                            `/phoneme?phoneme=zh&sentence1=The+measure+of+pleasure&sentence2=is+the+measure+of+leisure.&sentence3=The+measure+of+treasure&commonissues=zh-z`
                        )
                    }
                >
                    <Tilt
                        options={defaultOptions}
                        className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
                    >
                        "zh"
                    </Tilt>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                        router.push(
                            `/phoneme?phoneme=tʃ&sentence1=The+chair+is+by+the+table.&sentence2=Cheese+is+delicious.&sentence3=She+chose+chocolate+over+vanilla.&commonissues=sh`
                        )
                    }
                >
                    <Tilt
                        options={defaultOptions}
                        className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
                    >
                        "tʃ"
                    </Tilt>
                </motion.div>
            </div>
            <div className="h-32">s</div>
        </div>
    );
}
