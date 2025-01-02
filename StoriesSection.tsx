import React, { useState } from 'react';
import { StoryAvatar } from './StoryAvatar';
import { StoryViewer } from './StoryViewer';

const MOCK_STORIES = [
  {
    id: 1,
    user: {
      name: 'Emma Watson',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150',
    },
    items: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800', timestamp: '2h ago' },
      { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800', timestamp: '1h ago' },
    ],
  },
  {
    id: 2,
    user: {
      name: 'Tom Hardy',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150',
    },
    items: [
      { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800', timestamp: '3h ago' },
    ],
  },
  {
    id: 3,
    user: {
      name: 'Sophie Turner',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150',
    },
    items: [
      { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800', timestamp: '5h ago' },
    ],
  },
];

export function StoriesSection() {
  const [viewedStories, setViewedStories] = useState<number[]>([]);
  const [activeStory, setActiveStory] = useState<number | null>(null);

  const handleStoryClick = (storyId: number) => {
    setActiveStory(storyId);
    if (!viewedStories.includes(storyId)) {
      setViewedStories([...viewedStories, storyId]);
    }
  };

  return (
    <>
      <div className="bg-white border-b">
        <div className="flex space-x-4 p-4 overflow-x-auto hide-scrollbar">
          {MOCK_STORIES.map((story) => (
            <StoryAvatar
              key={story.id}
              image={story.user.image}
              name={story.user.name}
              isViewed={viewedStories.includes(story.id)}
              onClick={() => handleStoryClick(story.id)}
            />
          ))}
        </div>
      </div>

      {activeStory !== null && (
        <StoryViewer
          story={MOCK_STORIES.find(s => s.id === activeStory)!}
          onClose={() => setActiveStory(null)}
        />
      )}
    </>
  );
}