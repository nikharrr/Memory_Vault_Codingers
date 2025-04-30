import React from 'react';

function LandingPage({ onNavigate }) {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Hero Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://source.unsplash.com/1920x1080/?memories,family"
                    alt="Memories background"
                    className="w-full h-full object-cover filter brightness-50"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
                <div className="text-center max-w-3xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-xl">
                    <h1 className="text-6xl font-bold mb-6 text-yellow-300">Memory Moments</h1>
                    <p className="text-xl mb-12 text-gray-200">
                        Capture, preserve, and relive your precious memories in one beautiful place.
                    </p>
                    <button
                        onClick={() => onNavigate('login')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
                    >
                        Start Your Journey
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;