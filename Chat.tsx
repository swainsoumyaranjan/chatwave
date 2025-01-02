import React, { useState, useRef, useEffect } from 'react';
import { ChatHeader } from '../components/chat/ChatHeader';
import { MessageBubble } from '../components/chat/MessageBubble';
import { MessageInput } from '../components/chat/MessageInput';
import { ChatSearch } from '../components/chat/ChatSearch';
import { SearchResults } from '../components/chat/SearchResults';
import { StoriesSection } from '../components/stories/StoriesSection';

const MOCK_USER = {
  name: 'Emma Watson',
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150',
  isOnline: true,
};

const MOCK_MESSAGES = [
  { id: 1, content: 'Hey, how are you?', isSender: false, timestamp: '10:30 AM' },
  { id: 2, content: 'I\'m good, thanks! How about you?', isSender: true, timestamp: '10:31 AM' },
];

function Chat() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Mock search results
    const results = messages.filter(msg => 
      msg.content.toLowerCase().includes(query.toLowerCase())
    ).map(msg => ({
      id: msg.id,
      content: msg.content,
      timestamp: msg.timestamp,
      matchPositions: [msg.content.toLowerCase().indexOf(query.toLowerCase())]
    }));
    setSearchResults(results);
  };

  const handleSearchResultClick = (messageId: number) => {
    const element = document.getElementById(`message-${messageId}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      isSender: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader user={MOCK_USER} />
      <StoriesSection />
      
      <div className="p-4 border-b">
        <ChatSearch onSearch={handleSearch} />
        <SearchResults 
          results={searchResults}
          onResultClick={handleSearchResultClick}
          searchQuery={searchQuery}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} id={`message-${message.id}`}>
            <MessageBubble message={message} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;