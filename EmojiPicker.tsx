import React from 'react';

const EMOJI_CATEGORIES = [
  {
    name: 'Smileys',
    emojis: ['😊', '😂', '🥰', '😍', '😎', '🤗', '😋', '🤔', '😴', '😭']
  },
  {
    name: 'Hearts',
    emojis: ['❤️', '💜', '💙', '💚', '💛', '🧡', '🖤', '💝', '💖', '💕']
  }
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isOpen: boolean;
}

export function EmojiPicker({ onEmojiSelect, isOpen }: EmojiPickerProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border p-2 w-64">
      <div className="grid grid-cols-5 gap-2">
        {EMOJI_CATEGORIES.map(category => (
          <div key={category.name}>
            {category.emojis.map(emoji => (
              <button
                key={emoji}
                onClick={() => onEmojiSelect(emoji)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}