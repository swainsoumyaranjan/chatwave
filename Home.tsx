import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="mb-6">
            <Heart size={48} className="mx-auto text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Find Your Match</h1>
          <p className="text-gray-600 mb-8">
            Discover meaningful connections through shared interests and experiences
          </p>
          <button
            onClick={() => navigate('/discover')}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Start Discovering
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;