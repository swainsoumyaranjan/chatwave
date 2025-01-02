import React from 'react';
import { Phone, Video, Info } from 'lucide-react';

interface ChatHeaderProps {
  user: {
    name: string;
    image: string;
    isOnline: boolean;
  };
}

export function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={user.image}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {user.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div>
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-xs text-gray-500">
            {user.isOnline ? 'Active now' : 'Offline'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Phone size={20} />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Video size={20} />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Info size={20} />
        </button>
      </div>
    </div>
  );
}