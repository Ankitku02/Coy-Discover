import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { MapPin, CheckCircle2, Heart, X, Info } from 'lucide-react';

const ProfileCard = ({
  profile,
  isFront,
  onSwipe,
  onOpenDetails,
  cardIndex = 1,
  totalCards = 30,
  swipeTrigger, // Optional external trigger from buttons
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-25, 25]);

  // Dynamic stamp badge opacities during drag
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-20, -120], [0, 1]);

  // Dynamic tint overlays
  const rightOverlayOpacity = useTransform(x, [10, 160], [0, 0.45]);
  const leftOverlayOpacity = useTransform(x, [-10, -160], [0, 0.45]);

  const [isExiting, setIsExiting] = useState(false);

  // Programmatic swipe (called by buttons or when drag exceeds threshold)
  const flyOut = async (direction) => {
    if (isExiting) return;
    setIsExiting(true);

    const targetX = direction === 'like' ? 600 : -600;
    await animate(x, targetX, {
      duration: 0.28,
      ease: [0.32, 0.72, 0, 1],
    });

    onSwipe(direction);
  };

  // Expose flyOut if triggered externally via Like/Pass buttons
  React.useEffect(() => {
    if (swipeTrigger && isFront) {
      flyOut(swipeTrigger);
    }
  }, [swipeTrigger]);

  const handleDragEnd = (_, info) => {
    const threshold = 70;
    const velocityThreshold = 250;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      flyOut('like');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      flyOut('pass');
    } else {
      // Snap smoothly back to center
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
    }
  };

  if (!profile) return null;

  return (
    <motion.div
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
      }}
      drag={isFront && !isExiting ? 'x' : false}
      dragElastic={0.9}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isFront && !isExiting ? handleDragEnd : undefined}
      whileTap={isFront && !isExiting ? { cursor: 'grabbing' } : undefined}
      className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden select-none bg-white shadow-card touch-none ${
        isFront
          ? 'cursor-grab active:cursor-grabbing z-20'
          : 'scale-[0.94] translate-y-3 opacity-70 pointer-events-none z-10'
      }`}
    >
      {/* Background Profile Image */}
      <img
        src={profile.photo}
        alt={profile.name}
        draggable="false"
        className="w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Dynamic Feedback Overlays on Drag */}
      {isFront && (
        <>
          {/* Like Tint Overlay */}
          <motion.div
            style={{ opacity: rightOverlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-coy-primary/70 via-coy-accent/40 to-transparent pointer-events-none z-10"
          />

          {/* Pass Tint Overlay */}
          <motion.div
            style={{ opacity: leftOverlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-rose-600/70 via-rose-500/40 to-transparent pointer-events-none z-10"
          />

          {/* Dynamic LIKE Badge */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-8 z-30 flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-coy-primary to-coy-accent text-white font-extrabold text-xl shadow-xl border-2 border-white pointer-events-none -rotate-12"
          >
            <Heart className="w-6 h-6 fill-white" />
            <span>LIKE</span>
          </motion.div>

          {/* Dynamic PASS Badge */}
          <motion.div
            style={{ opacity: passOpacity }}
            className="absolute top-8 right-8 z-30 flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-500 text-white font-extrabold text-xl shadow-xl border-2 border-white pointer-events-none rotate-12"
          >
            <X className="w-6 h-6 stroke-[3px]" />
            <span>PASS</span>
          </motion.div>
        </>
      )}

      {/* Card Counter Badge */}
      <div className="absolute top-5 right-5 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20 pointer-events-none">
        {cardIndex} / {totalCards}
      </div>

      {/* Vignette Gradient at Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Profile Details Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 z-20 text-white flex flex-col justify-end pointer-events-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {profile.name}, {profile.age}
            </h2>
            <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400" />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(profile);
            }}
            className="pointer-events-auto w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition active:scale-95"
            aria-label="View more details"
          >
            <Info className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Location & Active status */}
        <div className="flex items-center gap-1.5 text-white/90 text-sm mt-1.5 font-medium">
          <MapPin className="w-4 h-4 text-coy-accent" />
          <span>{profile.cityOrCollege}</span>
          <span className="text-white/50">•</span>
          <span className="text-white/80">Active now</span>
        </div>

        {/* Short Bio */}
        <p className="text-white/85 text-xs mt-2 line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>

        {/* Interest tags */}
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
