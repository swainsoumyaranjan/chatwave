import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Mock data for development
const MOCK_PROFILES = [
  {
    id: '1',
    name: 'Emma Watson',
    bio: 'Actress, activist, and book lover',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800'
  },
  {
    id: '2',
    name: 'Tom Hardy',
    bio: 'Adventure seeker and coffee enthusiast',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800'
  },
  {
    id: '3',
    name: 'Sophie Turner',
    bio: 'Travel lover and photography enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800'
  }
];

export const fetchProfiles = async () => {
  try {
    // For development, return mock data
    // In production, uncomment the API call
    // const response = await api.get('/profiles');
    // return response.data;
    return MOCK_PROFILES;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }
};

export const handleMatch = async (userId: string, targetId: string, liked: boolean) => {
  try {
    // For development, mock the response
    // In production, uncomment the API call
    // const response = await api.post('/match', { userId, targetId, liked });
    // return response.data;
    return { status: liked ? 'pending' : 'rejected' };
  } catch (error) {
    console.error('Error handling match:', error);
    return null;
  }
};