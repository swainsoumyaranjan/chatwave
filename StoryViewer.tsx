import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryItem {
  id: number;
  type: 'image';
  url: string;
  timestamp: string;
}

interface Story {
  id: number;
  user: {
    name: string;
    image: string;
  };
  items: StoryItem[];
}

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
}

export function StoryViewer({ story, onClose }: StoryViewerProps) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentItemIndex < story.items.length - 1) {
            setCurrentItemIndex(prev => prev + 1);
            return 0;
          } else {
            onClose();
            return prev;
          }
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [currentItemIndex, story.items.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex space-x-1 p-2">
          {story.items.map((_, idx) => (
            <div key={idx} className="flex-1 h-0.5 bg-gray-600 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-50 ease-linear"
                style={{
                  width: `${idx === currentItemIndex ? progress : idx < currentItemIndex ? 100 : 0}%`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white"
      >
        <X size={24} />
      </button>

      <div className="absolute top-8 left-4 z-10 flex items-center space-x-3">
        <img
          src={story.user.image}
          alt={story.user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white font-semibold">{story.user.name}</span>
        <span className="text-gray-300 text-sm">
          {story.items[currentItemIndex].timestamp}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.img
          key={currentItemIndex}
          src={story.items[currentItemIndex].url}
          alt={`Story ${currentItemIndex + 1}`}
          className="max-h-screen max-w-full object-contain"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>
    </motion.div>
  );
}