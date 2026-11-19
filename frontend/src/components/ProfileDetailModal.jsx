import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MapPin, Heart, X, Sparkles } from 'lucide-react';

const ProfileDetailModal = ({
  profile,
  isOpen,
  onClose,
  onLike,
  onPass,
}) => {
  if (!isOpen || !profile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-md h-[90vh] max-h-[720px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto pb-24">
            {/* Hero Image */}
            <div className="relative w-full h-80">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover"
              />

              {/* Back Button */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition active:scale-95 z-10"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent" />
            </div>

            {/* Profile Information */}
            <div className="px-6 pt-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-coy-text">
                  {profile.name}, {profile.age}
                </h2>
                <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500" />
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-coy-muted text-sm mt-1.5 font-medium">
                <MapPin className="w-4 h-4 text-coy-primary" />
                <span>{profile.cityOrCollege}</span>
                <span>•</span>
                <span className="text-purple-600 font-semibold">5 km away</span>
              </div>

              {/* Bio */}
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-coy-muted">About</h3>
                <p className="text-coy-text text-sm mt-2 leading-relaxed font-normal bg-purple-50/50 p-4 rounded-2xl border border-purple-100/50">
                  {profile.bio}
                </p>
              </div>

              {/* Interests */}
              <div className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-coy-muted">Interests</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.interests?.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-coy-primary border border-purple-200/50"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Fixed Action Bar */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-white/95 backdrop-blur-md border-t border-purple-100 flex items-center justify-around">
            <button
              onClick={() => {
                onClose();
                onPass();
              }}
              className="flex-1 py-3 mx-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-rose-100 active:scale-95 transition"
            >
              <X className="w-5 h-5" />
              <span>Pass</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onLike();
              }}
              className="flex-1 py-3 mx-2 rounded-2xl bg-gradient-to-r from-coy-primary to-coy-accent text-white font-bold text-sm shadow-btn-like flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Like</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileDetailModal;
