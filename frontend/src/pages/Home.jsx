import React from 'react';
import { Compass, Heart, Users, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const Home = ({ onGoToDiscover, onGoToMatches, totalProfiles = 30, matchesCount = 0 }) => {
  return (
    <div className="max-w-md mx-auto px-5 pt-2 pb-24 flex flex-col gap-5 animate-fade-in">
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#7138E8] via-[#854CE6] to-[#A78BFA] text-white p-6 shadow-xl shadow-purple-500/20">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Welcome to Coy</span>
          </div>

          <h1 className="text-2xl font-black tracking-tight leading-snug">
            Find your people, <br />
            one swipe at a time 💜
          </h1>

          <p className="text-white/80 text-xs mt-2 leading-relaxed max-w-[280px]">
            Explore verified profiles from top colleges & cities. Match only when interest is mutual!
          </p>

          <button
            onClick={onGoToDiscover}
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-coy-primary font-bold text-xs shadow-md hover:bg-purple-50 active:scale-95 transition"
          >
            <span>Start Discovering</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Decorative Blurred Circles */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-pink-500/30 blur-2xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
      </div>

      {/* Quick Action: Discover Feature Highlight */}
      <div
        onClick={onGoToDiscover}
        className="p-5 rounded-3xl bg-white border border-purple-100/80 shadow-card hover:shadow-card-hover cursor-pointer transition-all duration-200 group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-coy-primary group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-coy-accent uppercase tracking-wider">⭐ Core Feature</span>
              </div>
              <h3 className="text-base font-bold text-coy-text group-hover:text-coy-primary transition-colors">
                Discover Profiles
              </h3>
              <p className="text-xs text-coy-muted mt-0.5">
                Swipe right to like, left to pass
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-coy-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Mutual Match Privacy Promise Highlight */}
      <div className="p-4 rounded-3xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
        <div className="p-2 rounded-2xl bg-purple-100 text-coy-primary shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-coy-primary uppercase tracking-wider">
            Coy's Privacy Promise
          </h4>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            Likes remain completely private. A match is revealed only when both of you like each other.
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={onGoToDiscover}
          className="p-4 rounded-3xl bg-white border border-purple-100 shadow-sm cursor-pointer hover:border-coy-primary/40 transition"
        >
          <div className="flex items-center justify-between text-coy-muted mb-2">
            <span className="text-xs font-medium">Explore</span>
            <Users className="w-4 h-4 text-coy-secondary" />
          </div>
          <div className="text-2xl font-black text-coy-text">{totalProfiles}</div>
          <span className="text-[11px] text-coy-muted">Candidates in Feed</span>
        </div>

        <div
          onClick={onGoToMatches}
          className="p-4 rounded-3xl bg-white border border-purple-100 shadow-sm cursor-pointer hover:border-coy-primary/40 transition"
        >
          <div className="flex items-center justify-between text-coy-muted mb-2">
            <span className="text-xs font-medium">Matches</span>
            <Heart className="w-4 h-4 text-coy-accent fill-coy-accent/20" />
          </div>
          <div className="text-2xl font-black text-coy-primary">{matchesCount}</div>
          <span className="text-[11px] text-coy-muted">Mutual Connections</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
