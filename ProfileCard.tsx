import React from 'react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    bio: string;
    image: string;
  };
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="relative"
    >
      <img
        src={profile.image}
        alt={profile.name}
        className="w-full h-96 object-cover rounded-t-xl"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
        <h2 className="text-white text-2xl font-bold">
          {profile.name}
        </h2>
        <p className="text-white/90">{profile.bio}</p>
      </div>
    </motion.div>
  );
}