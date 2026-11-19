import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import SwipeButtons from '../components/SwipeButtons';
import EmptyState from '../components/EmptyState';
import ProfileDetailModal from '../components/ProfileDetailModal';
import { fetchFeed, submitSwipe, resetSwipesAndMatches } from '../services/api';

const Discover = ({
  onMatchFound,
  onGoToMatches,
  onOpenMatchModal,
}) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Load feed from backend
  const loadFeed = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFeed();
      setProfiles(data.profiles || []);
    } catch (err) {
      console.error('Failed to load feed:', err);
      setError('Unable to load candidate profiles. Please check backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  // Handle Swipe (Like or Pass)
  const handleSwipe = async (action) => {
    if (profiles.length === 0 || isSwiping) return;

    const currentProfile = profiles[0];
    setIsSwiping(true);

    // Optimistically advance cards
    const remaining = profiles.slice(1);
    setProfiles(remaining);

    try {
      const response = await submitSwipe(currentProfile._id, action);

      // Check if this created a mutual match!
      if (action === 'like' && response.isMatch && response.matchProfile) {
        onMatchFound(response.matchProfile);
        onOpenMatchModal(response.matchProfile);
      }
    } catch (err) {
      console.error('Swipe error:', err);
      // If error is 409 (already swiped), it's safe to continue
    } finally {
      setTimeout(() => {
        setIsSwiping(false);
      }, 250);
    }
  };

  // Reset Demo handler
  const handleReset = async () => {
    try {
      setIsResetting(true);
      await resetSwipesAndMatches();
      await loadFeed();
    } catch (err) {
      console.error('Reset error:', err);
    } finally {
      setIsResetting(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-coy-primary mb-3">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <p className="text-sm font-semibold text-coy-text">Finding amazing people...</p>
        <p className="text-xs text-coy-muted mt-1">Curating your personalized feed</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-3" />
        <h3 className="text-lg font-bold text-coy-text">Something went wrong</h3>
        <p className="text-xs text-coy-muted mt-1 mb-4">{error}</p>
        <button
          onClick={loadFeed}
          className="px-5 py-2.5 rounded-2xl bg-coy-primary text-white text-xs font-bold shadow-md hover:bg-coy-primary-dark transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty State (No profiles left)
  if (profiles.length === 0) {
    return (
      <EmptyState
        onGoToMatches={onGoToMatches}
        onResetDemo={handleReset}
        isResetting={isResetting}
      />
    );
  }

  const currentProfile = profiles[0];
  const nextProfile = profiles.length > 1 ? profiles[1] : null;

  return (
    <div className="max-w-md mx-auto px-4 pb-24 flex flex-col items-center select-none">
      {/* Card Stack Deck Container */}
      <div className="relative w-full aspect-[3/4.2] max-h-[540px] mt-2 mb-2">
        {/* Next card in deck (peeking underneath) */}
        {nextProfile && (
          <ProfileCard
            key={nextProfile._id}
            profile={nextProfile}
            isFront={false}
            cardIndex={2}
            totalCards={profiles.length}
          />
        )}

        {/* Current front card (interactive with swipe drag) */}
        <AnimatePresence>
          {currentProfile && (
            <ProfileCard
              key={currentProfile._id}
              profile={currentProfile}
              isFront={true}
              onSwipe={handleSwipe}
              onOpenDetails={(profile) => setSelectedProfile(profile)}
              cardIndex={1}
              totalCards={profiles.length}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons Below Card (Pass, Spark/Details, Like) */}
      <SwipeButtons
        onPass={() => handleSwipe('pass')}
        onLike={() => handleSwipe('like')}
        onInfo={() => setSelectedProfile(currentProfile)}
        disabled={isSwiping || profiles.length === 0}
      />

      {/* Expanded Profile Detail Modal */}
      <ProfileDetailModal
        profile={selectedProfile}
        isOpen={Boolean(selectedProfile)}
        onClose={() => setSelectedProfile(null)}
        onLike={() => handleSwipe('like')}
        onPass={() => handleSwipe('pass')}
      />
    </div>
  );
};

export default Discover;
