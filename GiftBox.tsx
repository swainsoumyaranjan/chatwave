import React from 'react';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GiftBox({ isOpen, onClose }: GiftBoxProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border p-4 w-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Send a Gift</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <button
            key={i}
            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Gift size={24} className="text-purple-500" />
          </button>
        ))}
      </div>
    </div>
  );
}