import React, { useEffect } from 'react';
import landingPageImg from '../assets/LandingPageImg.png';
import Fireflies from '../components/Fireflies';

function LandingPage({ onNavigate }) {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-load');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.3}s`;
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 w-full h-full transform transition-transform duration-1000 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <img
          src={landingPageImg}
          alt="Memories background"
          className="w-full h-full object-cover object-center filter brightness-75"
        />
      </div>

      {/* Fireflies animation */}
      <Fireflies />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4">
        {/* Title */}
        <div className="w-full max-w-4xl animate-on-load opacity-0 animate-fade-in">
          <div className="text-center p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:bg-black/40 hover:scale-[1.02]">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent animate-float">
              Memory Vault
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <div className="w-full max-w-2xl mt-8 animate-on-load opacity-0 animate-fade-in">
          <div className="text-center p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:bg-black/30">
            <p className="text-2xl text-gray-100 leading-relaxed">
              Capture, preserve, and relive your precious memories in one beautiful place.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-12 animate-on-load opacity-0 animate-fade-in">
          <button
            onClick={() => onNavigate('login')}
            className="group relative px-14 py-5 rounded-full overflow-hidden bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/30 "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-xl font-semibold text-white group-hover:text-white/90">
              Start Your Journey
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
