import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, ChevronRight, Sparkles, Send, X, ArrowLeft, Loader2 } from 'lucide-react';
import { fetchMatches } from '../services/api';

const Matches = ({ onGoToDiscover }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChatProfile, setActiveChatProfile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await fetchMatches();
      setMatches(data.matches || []);
    } catch (err) {
      console.error('Failed to load matches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const openChat = (profile) => {
    setActiveChatProfile(profile);
    setChatMessages([
      {
        id: 1,
        sender: 'them',
        text: `Hey! Excited we matched on Coy! How's your week going? ✨`,
        time: 'Just now',
      },
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputMessage,
      time: 'Just now',
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Simulated friendly reply after 1.2s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'them',
          text: `Haha totally agree! Love your vibe by the way 💜`,
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Loader2 className="w-8 h-8 text-coy-primary animate-spin mb-3" />
        <p className="text-sm font-semibold text-coy-text">Loading your connections...</p>
      </div>
    );
  }

  // Empty Matches State
  if (matches.length === 0) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center animate-fade-in flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-coy-primary mb-4 shadow-sm">
          <Heart className="w-10 h-10 stroke-[2px]" />
        </div>
        <h3 className="text-xl font-bold text-coy-text">No matches yet</h3>
        <p className="text-xs text-coy-muted mt-2 max-w-xs leading-relaxed">
          When someone you like likes you back, they will appear here. Start swiping to make connections!
        </p>
        <button
          onClick={onGoToDiscover}
          className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-coy-primary to-coy-accent text-white font-bold text-xs shadow-btn hover:opacity-95 active:scale-95 transition"
        >
          Explore Discover Feed
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 pb-24 animate-fade-in">
      {/* Matches Horizontal Highlight Avatars */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 px-1 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-coy-accent" />
          <span className="text-xs font-bold text-coy-muted uppercase tracking-wider">
            Recent Matches ({matches.length})
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {matches.map((profile) => (
            <div
              key={profile._id}
              onClick={() => openChat(profile)}
              className="flex flex-col items-center shrink-0 cursor-pointer group"
            >
              <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-coy-primary to-coy-accent shadow-md group-hover:scale-105 transition-transform">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 ring-2 ring-white"></span>
              </div>
              <span className="text-xs font-semibold text-coy-text mt-1.5 truncate max-w-[68px]">
                {profile.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="bg-white rounded-3xl p-3 shadow-card border border-purple-100/60 flex flex-col divide-y divide-purple-50">
        {matches.map((profile, idx) => (
          <div
            key={profile._id}
            onClick={() => openChat(profile)}
            className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-purple-50/60 cursor-pointer transition active:scale-[0.99] group"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative w-13 h-13 rounded-full overflow-hidden shadow-sm shrink-0">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-sm font-bold text-coy-text group-hover:text-coy-primary transition-colors">
                  {profile.name}, {profile.age}
                </h4>
                <p className="text-xs text-coy-muted mt-0.5 flex items-center gap-1">
                  <span>{profile.cityOrCollege}</span>
                  <span>•</span>
                  <span className="text-purple-600 font-medium">
                    {idx === 0 ? 'Matched recently' : `Matched ${idx + 1}d ago`}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                title="Chat"
                className="w-8 h-8 rounded-full bg-purple-100 text-coy-primary flex items-center justify-center group-hover:bg-coy-primary group-hover:text-white transition"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-coy-primary group-hover:translate-x-0.5 transition" />
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Live Chat Drawer / Modal */}
      {activeChatProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md h-[85vh] max-h-[650px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-scale-up">
            {/* Chat Header */}
            <div className="px-4 py-3.5 bg-white border-b border-purple-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveChatProfile(null)}
                  className="p-1.5 rounded-full hover:bg-purple-50 text-coy-muted hover:text-coy-text"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-coy-primary/30">
                  <img
                    src={activeChatProfile.photo}
                    alt={activeChatProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-coy-text">
                    {activeChatProfile.name}
                  </h3>
                  <span className="text-[11px] text-green-500 font-medium">● Online</span>
                </div>
              </div>

              <button
                onClick={() => setActiveChatProfile(null)}
                className="p-1.5 rounded-full hover:bg-purple-50 text-coy-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8FF]">
              <div className="text-center my-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-purple-100 text-coy-primary">
                  You matched with {activeChatProfile.name} 🎉
                </span>
              </div>

              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'me'
                        ? 'bg-coy-primary text-white rounded-br-sm shadow-sm'
                        : 'bg-white text-coy-text rounded-bl-sm border border-purple-100 shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[9px] mt-1 block ${
                        msg.sender === 'me' ? 'text-white/70 text-right' : 'text-gray-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t border-purple-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${activeChatProfile.name.split(' ')[0]}...`}
                className="flex-1 px-4 py-2.5 text-xs rounded-full bg-purple-50/70 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-coy-primary/40 text-coy-text placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-10 h-10 rounded-full bg-coy-primary text-white flex items-center justify-center hover:bg-coy-primary-dark transition active:scale-95 disabled:opacity-40"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;
