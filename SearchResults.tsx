import React from 'react';
import { MessageCircle } from 'lucide-react';

interface SearchResult {
  id: number;
  content: string;
  timestamp: string;
  matchPositions: number[];
}

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (id: number) => void;
  searchQuery: string;
}

export function SearchResults({ results, onResultClick, searchQuery }: SearchResultsProps) {
  if (!searchQuery) return null;

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={i} className="bg-yellow-200">{part}</span> : part
    );
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50">
      {results.length > 0 ? (
        results.map((result) => (
          <button
            key={result.id}
            onClick={() => onResultClick(result.id)}
            className="w-full p-4 text-left hover:bg-gray-50 flex items-start gap-3 border-b last:border-b-0"
          >
            <MessageCircle size={20} className="text-gray-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-900">
                {highlightText(result.content)}
              </p>
              <span className="text-xs text-gray-500 mt-1 block">
                {result.timestamp}
              </span>
            </div>
          </button>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          No messages found for "{searchQuery}"
        </div>
      )}
    </div>
  );
}