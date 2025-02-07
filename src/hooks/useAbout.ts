import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { About } from '../types/database';

export function useAbout() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const { data, error } = await supabase
          .from('about')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching about:', error);
          setAbout(null);
          return;
        }

        setAbout(data);
      } catch (error) {
        console.error('Error fetching about:', error);
        setAbout(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  return { about, loading };
}
