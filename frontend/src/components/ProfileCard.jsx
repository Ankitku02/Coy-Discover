import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, CheckCircle2, Heart, X, Info } from 'lucide-react';

const ProfileCard = ({
  profile,
  isFront,
  onSwipe,
  onOpenDetails,
  cardIndex = 1,
  totalCards = 30,
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);

  // Dynamic stamp opacities on drag
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const passOpacity = useTransform(x, [-20, -100], [0, 1]);

  // Dynamic soft color tint over the card
  const rightOverlayOpacity = useTransform(x, [10, 150], [0, 0.45]);
  const leftOverlayOpacity = useTransform(x, [-10, -150], [0, 0.45]);

  const handleDragEnd = (_, info) => {
    const threshold = 100;
    const velocityThreshold = 400;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      onSwipe('like');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      onSwipe('pass');
    }
  };

  if (!profile) return null;

  return (
    <motion.div
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isFront ? handleDragEnd : undefined}
      whileTap={isFront ? { cursor: 'grabbing' } : undefined}
      className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden select-none bg-white shadow-card cursor-grab active:cursor-grabbing transition-transform ${
        !isFront ? 'scale-[0.94] translate-y-3 opacity-60 pointer-events-none' : ''
      }`}
    >
      {/* Background Profile Image */}
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />

      {/* Subtle Drag Overlays */}
      {isFront && (
        <>
          {/* Right Drag (Like / Purple-Pink Overlay) */}
          <motion.div
            style={{ opacity: rightOverlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-coy-primary/70 via-coy-accent/40 to-transparent pointer-events-none"
          />

          {/* Left Drag (Pass / Rose Overlay) */}
          <motion.div
            style={{ opacity: leftOverlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-rose-600/70 via-rose-500/40 to-transparent pointer-events-none"
          />

          {/* Dynamic "LIKE" Floating Badge */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-coy-primary to-coy-accent text-white font-extrabold text-xl shadow-lg border-2 border-white pointer-events-none -rotate-12"
          >
            <Heart className="w-6 h-6 fill-white" />
            <span>LIKE</span>
          </motion.div>

          {/* Dynamic "PASS" Floating Badge */}
          <motion.div
            style={{ opacity: passOpacity }}
            className="absolute top-8 right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-500 text-white font-extrabold text-xl shadow-lg border-2 border-white pointer-events-none rotate-12"
          >
            <X className="w-6 h-6 stroke-[3px]" />
            <span>PASS</span>
          </motion.div>
        </>
      )}

      {/* Top Header Floating Badge: Card Counter */}
      <div className="absolute top-5 right-5 z-10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20">
        {cardIndex} / {totalCards}
      </div>

      {/* Gradient Vignette at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Profile Details Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-10 text-white flex flex-col justify-end">
        {/* Name, Age and Verified Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {profile.name}, {profile.age}
            </h2>
            <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400" />
          </div>

          {/* Info Button to Open Details */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(profile);
            }}
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition active:scale-95"
            aria-label="View more details"
          >
            <Info className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Location & College */}
        <div className="flex items-center gap-1.5 text-white/90 text-sm mt-1.5 font-medium">
          <MapPin className="w-4 h-4 text-coy-accent" />
          <span>{profile.cityOrCollege}</span>
          <span className="text-white/50">•</span>
          <span className="text-white/80">Active now</span>
        </div>

        {/* Bio Preview */}
        <p className="text-white/85 text-xs mt-2 line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>

        {/* Interests Pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {profile.interests?.slice(0, 3).map((interest, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white/95 border border-white/10"
            >
              {interest}
            </span>
          ))}
          {profile.interests?.length > 3 && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md text-white/80">
              +{profile.interests.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
