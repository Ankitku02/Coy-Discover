import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

const SwipeButtons = ({ onLike, onPass, onInfo, disabled = false }) => {
  return (
    <div className="relative z-30 flex items-center justify-center gap-6 py-2">
      {/* Pass / Nope Button */}
      <button
        type="button"
        onClick={onPass}
        disabled={disabled}
        aria-label="Pass profile"
        className="cursor-pointer w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-card hover:shadow-card-hover border border-rose-100 text-rose-500 hover:bg-rose-50 hover:scale-105 active:scale-90 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none group"
      >
        <X className="w-7 h-7 stroke-[2.8px] group-hover:rotate-12 transition-transform duration-200 pointer-events-none" />
      </button>

      {/* Spark / Info Button */}
      <button
        type="button"
        onClick={onInfo}
        disabled={disabled}
        aria-label="View Profile Details"
        className="cursor-pointer w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm border border-purple-100 text-coy-secondary hover:text-coy-primary hover:bg-purple-50 hover:scale-105 active:scale-90 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none group"
      >
        <Sparkles className="w-5 h-5 fill-purple-100 group-hover:scale-110 transition-transform pointer-events-none" />
      </button>

      {/* Like / Match Button */}
      <button
        type="button"
        onClick={onLike}
        disabled={disabled}
        aria-label="Like profile"
        className="cursor-pointer w-16 h-16 rounded-full bg-gradient-to-tr from-coy-primary to-coy-accent flex items-center justify-center shadow-btn-like text-white hover:scale-105 active:scale-90 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none group"
      >
        <Heart className="w-8 h-8 fill-white stroke-[2.2px] group-hover:scale-110 transition-transform duration-200 pointer-events-none" />
      </button>
    </div>
  );
};

export default SwipeButtons;
