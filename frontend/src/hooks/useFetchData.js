import { useState, useCallback } from 'react';

export default function useFetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint) => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const baseUrl = 'https://upcoming-matches-task.onrender.com/api';
      let url = baseUrl;

      if (endpoint.startsWith('/matches')) {
        url += '/matches';
      } else if (endpoint.includes('/competitions/')) {
        const parts = endpoint.split('/');
        const competition = parts[2];
        const resource   = parts[3]?.split('?')[0];
        const params     = endpoint.split('?')[1] || '';

        if (resource === 'matches') {
          url += `/matches?competition=${competition}&${params}`;
        } else if (resource === 'standings') {
          url += `/standings?competition=${competition}`;
        } else if (resource === 'scorers') {
          url += `/scorers?competition=${competition}`;
        }
      } else if (endpoint.includes('/teams/')) {
        const teamId = endpoint.split('/')[2];
        url += `/team-matches?teamId=${teamId}&status=SCHEDULED`;
      }

      console.log('Fetching from:', url);
      const response = await fetch(url);
      const result   = await response.json();

      if (result.success) {
        setData(result.matches || result.standings || result.scorers || []);
      } else {
        setError(result.message || 'Failed to fetch data');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
}
