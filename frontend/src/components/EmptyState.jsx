import React from 'react';
import { PackageOpen, Sparkles, RotateCcw, Heart } from 'lucide-react';

const EmptyState = ({ onGoToMatches, onResetDemo, isResetting = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center max-w-sm mx-auto animate-fade-in">
      {/* 3D Box Illustration / Icon with Floating Hearts */}
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-100 to-pink-50 flex items-center justify-center border border-purple-200/60 shadow-lg">
          <PackageOpen className="w-14 h-14 text-coy-primary" />
        </div>

        {/* Floating Heart Decor */}
        <div className="absolute -top-3 -right-2 p-2 rounded-full bg-gradient-to-tr from-coy-primary to-coy-accent text-white shadow-md animate-bounce">
          <Heart className="w-4 h-4 fill-white" />
        </div>
        <div className="absolute -bottom-2 -left-2 p-1.5 rounded-full bg-purple-200 text-coy-primary shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Heading & Subtitle */}
      <h3 className="text-2xl font-bold text-coy-text tracking-tight">
        No more profiles!
      </h3>
      <p className="text-sm text-coy-muted mt-2 leading-relaxed">
        You've seen all the profiles for now. Check your mutual matches or reset to swipe again!
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3 w-full">
        <button
          onClick={onGoToMatches}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-coy-primary to-coy-accent text-white font-bold text-sm shadow-btn hover:opacity-95 active:scale-95 transition"
        >
          Go to Matches
        </button>

        <button
          onClick={onResetDemo}
          disabled={isResetting}
          className="w-full py-3 px-6 rounded-2xl bg-white border border-purple-200 text-coy-primary font-semibold text-sm hover:bg-purple-50 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-60"
        >
          <RotateCcw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
          <span>{isResetting ? 'Resetting profiles...' : 'Reset Feed (Demo)'}</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
