import React from 'react';
import { Heart, Bell, SlidersHorizontal, Sparkles } from 'lucide-react';

const Navbar = ({ activeTab, matchesCount = 0 }) => {
  return (
    <header className="w-full max-w-md mx-auto px-5 py-4 flex items-center justify-between bg-coy-bg/80 backdrop-blur-md sticky top-0 z-30">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-coy-primary to-coy-accent flex items-center justify-center shadow-md shadow-coy-primary/25">
          <Heart className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-coy-primary via-coy-primary-light to-coy-accent bg-clip-text text-transparent">
          Coy
        </span>
      </div>

      {/* Screen Title for Discover/Matches */}
      <div className="text-sm font-semibold text-coy-muted uppercase tracking-wider">
        {activeTab === 'discover' && 'Discover'}
        {activeTab === 'matches' && `Matches (${matchesCount})`}
        {activeTab === 'home' && 'Welcome'}
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-2">
        {activeTab === 'discover' ? (
          <button
            title="Filter preferences"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-coy-text hover:text-coy-primary shadow-sm transition active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        ) : (
          <button
            title="Notifications"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-coy-text hover:text-coy-primary shadow-sm transition relative active:scale-95"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-coy-accent absolute top-2 right-2 ring-2 ring-white"></span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
