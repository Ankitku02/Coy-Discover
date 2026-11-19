import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import MatchModal from './components/MatchModal';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Matches from './pages/Matches';
import { fetchMatches } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [matchesCount, setMatchesCount] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  // Sync matches count on load
  const syncMatches = async () => {
    try {
      const data = await fetchMatches();
      setMatchesCount(data.count || 0);
    } catch (err) {
      console.error('Error fetching matches count:', err);
    }
  };

  useEffect(() => {
    syncMatches();
  }, [activeTab]);

  const handleMatchFound = (profile) => {
    setMatchesCount((prev) => prev + 1);
    setMatchedProfile(profile);
    setIsMatchModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-coy-bg text-coy-text flex flex-col font-sans selection:bg-purple-200">
      {/* Top App Header */}
      <Navbar activeTab={activeTab} matchesCount={matchesCount} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md mx-auto relative overflow-hidden">
        {activeTab === 'home' && (
          <Home
            onGoToDiscover={() => setActiveTab('discover')}
            onGoToMatches={() => setActiveTab('matches')}
            matchesCount={matchesCount}
          />
        )}

        {activeTab === 'discover' && (
          <Discover
            onMatchFound={handleMatchFound}
            onGoToMatches={() => setActiveTab('matches')}
            onOpenMatchModal={(profile) => {
              setMatchedProfile(profile);
              setIsMatchModalOpen(true);
            }}
          />
        )}

        {activeTab === 'matches' && (
          <Matches onGoToDiscover={() => setActiveTab('discover')} />
        )}
      </main>

      {/* "It's a Match!" Celebration Modal */}
      <MatchModal
        isOpen={isMatchModalOpen}
        matchedProfile={matchedProfile}
        onClose={() => setIsMatchModalOpen(false)}
        onChatNow={() => {
          setIsMatchModalOpen(false);
          setActiveTab('matches');
        }}
      />

      {/* Floating Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matchesCount={matchesCount}
      />
    </div>
  );
}

export default App;
