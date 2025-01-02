import React from 'react';
import { Settings, Camera } from 'lucide-react';

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800"
            alt="Profile"
            className="w-full h-48 object-cover"
          />
          <button className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg">
            <Camera size={20} className="text-gray-600" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Sarah Johnson</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">About Me</h2>
              <p className="text-gray-600">
                Adventure seeker and coffee enthusiast. Love exploring new places and meeting new people.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Interests</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Travel', 'Photography', 'Music', 'Coffee', 'Hiking'].map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;