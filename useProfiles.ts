import { useState, useEffect } from 'react';
import { fetchProfiles } from '../lib/api';

interface Profile {
  id: string;
  name: string;
  bio: string;
  image: string;
}

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setLoading(true);
        const data = await fetchProfiles();
        setProfiles(data);
      } catch (err) {
        setError('Failed to load profiles');
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  return { profiles, loading, error };
}