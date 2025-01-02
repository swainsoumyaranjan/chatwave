import React, { useState } from 'react';
import { Send, Image, Smile, Gift } from 'lucide-react';
import { EmojiPicker } from '../emoji/EmojiPicker';
import { GiftBox } from './GiftBox';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const newMessage = message.slice(0, cursorPosition) + emoji + message.slice(cursorPosition);
    setMessage(newMessage);
    setCursorPosition(cursorPosition + emoji.length);
    // Keep emoji picker open for multiple selections
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart || 0);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCursorPosition(e.currentTarget.selectionStart || 0);
  };

  return (
    <div className="border-t bg-white">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Image size={24} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              onClick={handleInputClick}
              onKeyUp={handleInputKeyUp}
              placeholder="Message..."
              className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsEmojiPickerOpen(!isEmojiPickerOpen);
                setIsGiftBoxOpen(false);
              }}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Smile size={24} />
            </button>
            <EmojiPicker 
              isOpen={isEmojiPickerOpen}
              onEmojiSelect={handleEmojiSelect}
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsGiftBoxOpen(!isGiftBoxOpen);
                setIsEmojiPickerOpen(false);
              }}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Gift size={24} />
            </button>
            <GiftBox 
              isOpen={isGiftBoxOpen}
              onClose={() => setIsGiftBoxOpen(false)}
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 text-purple-500 hover:text-purple-700 transition-colors disabled:opacity-50"
          >
            <Send size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}