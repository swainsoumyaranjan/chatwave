import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, MessageCircle, User } from 'lucide-react';

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/discover" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
          <Users size={24} />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        <Link to="/chat" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-purple-600">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;