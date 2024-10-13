// pages/index.tsx

import React from "react";
import Navbar from "./components/navbar";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <header className="bg-green-500 text-white p-5 text-center">
        <h1 className="text-4xl font-bold">Welcome to PronunFix!</h1>
        <p>Your speech analysis companion.</p>
      </header>
      <main className="flex-grow p-5">
        <section className="text-center mb-10">
          <h2 className="text-3xl font-semibold">Improve Your Pronunciation</h2>
          <p className="mt-2">
            Our app analyzes your speech and provides personalized feedback to
            help you pronounce words correctly.
          </p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Get Started
          </button>
        </section>
        <section className="text-center">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="mt-2 list-disc list-inside">
            <li>Real-time speech analysis</li>
            <li>Detailed pronunciation feedback</li>
            <li>Access to resources and exercises</li>
          </ul>
        </section>
      </main>
      <footer className="bg-gray-200 p-5 text-center">
        <p>© 2024 PronunFix. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
