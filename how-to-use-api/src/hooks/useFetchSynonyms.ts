import { useState } from 'react';

export interface Synonym {
  word: string;
  score: number;
}

const API_URL = 'https://api.datamuse.com';

export function useFetchSynonyms() {
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSynonyms = async (word: string) => {
    setLoading(true);

    const url = new URL('/words', API_URL);
    url.searchParams.set('rel_syn', word);
    const response = await fetch(url);
    const data = await response.json();

    setSynonyms(data);
    setLoading(false);
  };

  return { loading, synonyms, fetchSynonyms };
}

export default useFetchSynonyms;
