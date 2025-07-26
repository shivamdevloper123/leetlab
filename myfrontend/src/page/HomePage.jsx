// src/pages/HomePage.jsx
import React from "react";
import  TilesBackground  from "../components/TilesBackground.jsx";
import { Link } from "react-router-dom";
import { getAvatarStyle } from "../components/getAvtarStyle.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const HomePage = () => {
const {authUser} = useAuthStore()
 
  const {  fullName } = getAvatarStyle(authUser?.name);
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-base-100">
      {/* Tile Background */}
      <TilesBackground />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 flex  flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
         Hi ! {fullName}
         <p className="my-5"> Welcome to CodeLab 🚀</p>
        </h1>
        <p className="mt-4 text-lg text-base-content/70 max-w-2xl">
          Practice coding, solve real-world problems, and prepare for your dream job — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <Link to="/problem" className="btn btn-primary px-6">
            Get Started
          </Link>
        
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 mt-20 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Daily Challenges",
            desc: "Sharpen your skills with curated problems every day.",
            icon: "🧠",
          },
          {
            title: "Track Progress",
            desc: "Monitor your improvement over time and stay motivated.",
            icon: "📈",
          },
          {
            title: "Competitive Mode",
            desc: "Challenge friends or practice under timed conditions.",
            icon: "⚔️",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="card bg-base-200 border border-base-300 shadow-md hover:shadow-lg transition"
          >
            <div className="card-body items-center text-center">
              <span className="text-4xl">{feature.icon}</span>
              <h2 className="card-title">{feature.title}</h2>
              <p className="text-base-content/70">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-24 py-8 text-center text-sm text-base-content/60">
        © {new Date().getFullYear()} CodeLab. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
