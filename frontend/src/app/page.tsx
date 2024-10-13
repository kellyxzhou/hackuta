// pages/index.tsx

import React from 'react';
import Navbar from './components/navbar';
import Visualizer from './components/visualizer';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-5">
                <section className="text-center mb-10">
                    <h2 className="text-3xl font-semibold">Improve Your Pronunciation</h2>
                    <p className="mt-2">Our app analyzes your speech and provides personalized feedback to help you pronounce words correctly.</p>
                </section>
                <section className="flex flex-col items-center mb-10">
                    <h2 className="text-3xl font-semibold">Audio Visualizer</h2>
                    <div className="flex justify-center w-full">
                        <Visualizer />
                    </div>
                </section>

            </main>

        </div>
    );
};

export default Home;
