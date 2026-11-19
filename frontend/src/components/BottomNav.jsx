import React from 'react';
import { Home, Compass, Heart } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab, matchesCount = 0 }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'matches', label: 'Matches', icon: Heart, badge: matchesCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 shadow-nav pb-safe">
      <div className="max-w-md mx-auto px-6 py-2.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all duration-200 relative ${
                isActive
                  ? 'text-coy-primary scale-105'
                  : 'text-gray-400 hover:text-coy-secondary'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1.5 rounded-full transition-colors ${
                    isActive ? 'bg-purple-100' : 'bg-transparent'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-transform ${
                      isActive ? 'stroke-[2.5px] fill-coy-primary/20' : 'stroke-[1.8px]'
                    }`}
                  />
                </div>

                {/* Match count badge */}
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-coy-primary to-coy-accent text-white shadow-sm ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] font-semibold tracking-wide mt-0.5 ${
                  isActive ? 'text-coy-primary font-bold' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-coy-primary absolute -bottom-1"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
