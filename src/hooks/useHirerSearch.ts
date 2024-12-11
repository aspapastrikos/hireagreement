import { useState, useEffect } from 'react';
import { searchHirers, getHirerByEmail, getHirerByLicense } from '../services/db';

export function useHirerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const performSearch = async () => {
      if (!searchTerm) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Try exact matches first
        const emailMatch = await getHirerByEmail(searchTerm);
        const licenseMatch = await getHirerByLicense(searchTerm);
        
        // Then do a general search
        const searchResults = await searchHirers(searchTerm);
        
        if (!mounted) return;

        const uniqueResults = Array.from(new Set([
          ...(emailMatch ? [emailMatch] : []),
          ...(licenseMatch ? [licenseMatch] : []),
          ...searchResults,
        ]));

        setResults(uniqueResults);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const debounceTimeout = setTimeout(performSearch, 300);
    return () => {
      mounted = false;
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    error,
  };
}