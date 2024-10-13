"use client";
import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@propelauth/nextjs/client";
import Spline from "@splinetool/react-spline";

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
      <div className="absolute top-0 w-full -z-30 h-1/2  scale-x-[-1]">
        <Spline
          scene="https://prod.spline.design/OY2hEj9n7p3Itn2n/scene.splinecode"
          className="absolute inset-0  opacity-25 "
        />
      </div>

      {/* Bottom Spline */}
      <div className="absolute bottom-0 -z-30 w-full h-1/2">
        <Spline
          scene="https://prod.spline.design/OY2hEj9n7p3Itn2n/scene.splinecode"
          className="absolute inset-0 scale-125 opacity-25"
        />
      </div>

      <h1 className="text-2xl font-bold py-2 px-4 mt-5 ml-16">
        Hi, {user?.firstName}!
      </h1>
      <h1 className="text-2xl px-4 ml-16 mt-1 mb-6">
        Here are some targeted exercises for you:
      </h1>
      <div className="flex flex-wrap justify-center gap-10 py-10 px-26 pb-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/conversate")}
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
          onClick={() => router.push("/conversate")}
        >
          <Tilt
            options={defaultOptions}
            className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
          >
            "fuh"
          </Tilt>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/conversate")}
        >
          <Tilt
            options={defaultOptions}
            className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
          >
            "neh"
          </Tilt>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/conversate")}
        >
          <Tilt
            options={defaultOptions}
            className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
          >
            "tuhk"
          </Tilt>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/conversate")}
        >
          <Tilt
            options={defaultOptions}
            className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
          >
            "luh"
          </Tilt>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/conversate")}
        >
          <Tilt
            options={defaultOptions}
            className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
          >
            "kay"
          </Tilt>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/conversate")}
        >
          <Tilt
            options={defaultOptions}
            className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
          >
            "neh"
          </Tilt>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/conversate")}
        >
          <Tilt
            options={defaultOptions}
            className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
          >
            "tuhk"
          </Tilt>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/conversate")}
        >
          <Tilt
            options={defaultOptions}
            className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
          >
            "luh"
          </Tilt>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/conversate")}
        >
          <Tilt
            options={defaultOptions}
            className="bg-white p-24 rounded-2xl border-2 border-gray-300 shadow-2xl flex items-center justify-center text-2xl font-semibold cursor-pointer"
          >
            "kay"
          </Tilt>
        </motion.div>
      </div>
    </div>
  );
}
