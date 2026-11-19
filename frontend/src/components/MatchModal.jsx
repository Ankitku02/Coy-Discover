import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Heart, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const MatchModal = ({
  isOpen,
  matchedProfile,
  onClose,
  onChatNow,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire celebratory confetti burst!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7138E8', '#A78BFA', '#FF6FAE', '#ffffff', '#FFD700'],
      });
    }
  }, [isOpen]);

  if (!isOpen || !matchedProfile) return null;

  // Current logged in demo user photo
  const currentUserPhoto =
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm rounded-[2.5rem] bg-gradient-to-b from-[#20153D] via-[#1A1230] to-[#120C22] border border-purple-500/20 text-white p-7 text-center overflow-hidden shadow-2xl"
        >
          {/* Background Ambient Glow & Floating Hearts */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-coy-primary/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-coy-accent/30 blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close match dialog"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition active:scale-90 z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Floating Heart Icon at Top */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-tr from-coy-primary to-coy-accent flex items-center justify-center shadow-lg shadow-purple-500/40"
          >
            <Heart className="w-6 h-6 fill-white text-white" />
          </motion.div>

          {/* Overlapping Profile Avatars */}
          <div className="relative flex items-center justify-center my-6 h-28">
            {/* User Avatar */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className="relative z-10 w-24 h-24 rounded-full ring-4 ring-coy-primary shadow-xl overflow-hidden -mr-5 bg-purple-900"
            >
              <img
                src={currentUserPhoto}
                alt="Your Avatar"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Heart Badge in Center of Avatars */}
            <div className="relative z-20 w-9 h-9 rounded-full bg-gradient-to-tr from-coy-accent to-pink-500 ring-2 ring-white flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white fill-white" />
            </div>

            {/* Matched Profile Avatar */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className="relative z-10 w-24 h-24 rounded-full ring-4 ring-coy-accent shadow-xl overflow-hidden -ml-5 bg-purple-900"
            >
              <img
                src={matchedProfile.photo}
                alt={matchedProfile.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-3xl font-extrabold tracking-tight">
            It's a <span className="bg-gradient-to-r from-coy-secondary via-pink-400 to-coy-accent bg-clip-text text-transparent">Match!</span>
          </h2>
          <p className="text-white/80 text-sm mt-2 max-w-[260px] mx-auto leading-relaxed">
            You and <span className="font-semibold text-white">{matchedProfile.name}</span> liked each other ❤️
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => {
                onClose();
                if (onChatNow) onChatNow(matchedProfile);
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-coy-primary to-coy-accent text-white font-bold text-sm shadow-btn-like flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Now</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-semibold text-white/70 hover:text-white flex items-center justify-center gap-1.5 transition active:scale-95"
            >
              <span>Keep Discovering</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MatchModal;
