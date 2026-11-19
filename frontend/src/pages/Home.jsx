import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';

const Home = ({ onGoToDiscover }) => {
  return (
    <div className="max-w-md mx-auto px-6 h-full min-h-[60vh] flex flex-col items-center justify-center text-center select-none animate-fade-in">
      {/* Minimal Placeholder Icon */}
      <div className="w-16 h-16 rounded-3xl bg-purple-100 flex items-center justify-center text-coy-primary mb-4 shadow-sm">
        <Compass className="w-8 h-8" />
      </div>

      {/* Clean Placeholder Text as per Assignment Instructions */}
      <h2 className="text-xl font-bold text-coy-text tracking-tight">
        Home
      </h2>

      <div className="mt-3 p-4 rounded-2xl bg-purple-50/80 border border-purple-100 text-xs text-coy-muted leading-relaxed max-w-xs">
        <p className="font-semibold text-coy-primary mb-1">
          📌 Assignment Note:
        </p>
        <p>
          As specified in Part B of the assignment instructions, the Home tab is kept blank as a placeholder. All discovery and swipe functionality is built in the <strong>Discover</strong> tab.
        </p>
      </div>

      {/* Button to go to Discover */}
      <button
        onClick={onGoToDiscover}
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-coy-primary to-coy-accent text-white font-bold text-xs shadow-btn hover:opacity-95 active:scale-95 transition"
      >
        <span>Open Discover Tab</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Home;
