import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { handleMatch } from '../lib/api';
import { useProfiles } from '../hooks/useProfiles';
import ProfileCard from '../components/ProfileCard';

const MOCK_USER_ID = 'current-user-id'; // Temporary mock ID

function Discover() {
  const { profiles, loading, error } = useProfiles();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = async (liked: boolean) => {
    if (!profiles[currentIndex]) return;

    const result = await handleMatch(MOCK_USER_ID, profiles[currentIndex].id, liked);
    
    if (result) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <AnimatePresence>
          {profiles[currentIndex] && (
            <ProfileCard profile={profiles[currentIndex]} />
          )}
        </AnimatePresence>
        
        <div className="flex justify-center gap-8 p-4">
          <button
            onClick={() => handleSwipe(false)}
            className="p-4 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition-colors"
          >
            <X size={24} />
          </button>
          <button
            onClick={() => handleSwipe(true)}
            className="p-4 bg-green-100 rounded-full text-green-600 hover:bg-green-200 transition-colors"
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Discover;