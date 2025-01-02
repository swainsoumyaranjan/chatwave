import React from 'react';

interface StoryAvatarProps {
  image: string;
  name: string;
  isViewed: boolean;
  onClick: () => void;
}

export function StoryAvatar({ image, name, isViewed, onClick }: StoryAvatarProps) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center space-y-1"
    >
      <div className={`p-0.5 rounded-full ${
        isViewed ? 'bg-gray-200' : 'bg-gradient-to-tr from-yellow-400 to-pink-500'
      }`}>
        <div className="p-0.5 bg-white rounded-full">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-gray-600 truncate w-20 text-center">
        {name}
      </span>
    </button>
  );
}