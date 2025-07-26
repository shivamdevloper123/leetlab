import React from "react";

import { User, Mail, Trophy, Star, Activity } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { getAvatarStyle } from "../components/getAvtarStyle";
const ProfilePage = () => {

    const {authUser} = useAuthStore()
    const {fullName ,char ,color} = getAvatarStyle(authUser?.name)
    
  const user = {
    name: fullName,
    email: authUser.email,
     char,
    solved: 120,
    attempted: 150,
    rank: 42,
    rating: 2100,
  };

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl space-y-10">
        {/* Profile Header */}
        <div className="bg-base-200 shadow-xl rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
          <div
                className={`h-24 w-24 rounded-full flex items-center justify-center text-5xl font-bold uppercase text-white ${color}`}
              >
                {char}
              </div>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> {user.name}
            </h2>
            <p className="text-sm  flex items-center gap-2">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat bg-base-200 rounded-xl shadow">
            <div className="stat-title">Solved</div>
            <div className="stat-value text-primary">{user.solved}</div>
          </div>
          <div className="stat bg-base-200 rounded-xl shadow">
            <div className="stat-title">Attempted</div>
            <div className="stat-value text-secondary">{user.attempted}</div>
          </div>
          <div className="stat bg-base-200 rounded-xl shadow">
            <div className="stat-title">Rank</div>
            <div className="stat-value text-accent">{user.rank}</div>
          </div>
          <div className="stat bg-base-200 rounded-xl shadow">
            <div className="stat-title">Rating</div>
            <div className="stat-value text-warning">{user.rating}</div>
          </div>
        </div>

        {/* Tabs for content */}
        <div className="bg-base-200 rounded-xl shadow-xl p-4">
          <div role="tablist" className="tabs tabs-bordered">
            <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Submissions" defaultChecked />
            <div role="tabpanel" className="tab-content p-4">
              <h3 className="text-lg font-semibold mb-2">Recent Submissions</h3>
              <ul className="space-y-2">
                <li className="bg-base-100 p-3 rounded-lg border-l-4 border-success">✅ Two Sum - JavaScript</li>
                <li className="bg-base-100 p-3 rounded-lg border-l-4 border-error">❌ Median of Two Arrays - Python</li>
                <li className="bg-base-100 p-3 rounded-lg border-l-4 border-success">✅ Reverse Linked List - C++</li>
              </ul>
            </div>

            <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Playlists" />
            <div role="tabpanel" className="tab-content p-4">
              <h3 className="text-lg font-semibold mb-2">Your Playlists</h3>
              <ul className="space-y-2">
                <li className="bg-base-100 p-3 rounded-lg">📚 DSA 450</li>
                <li className="bg-base-100 p-3 rounded-lg">📚 System Design Basics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
