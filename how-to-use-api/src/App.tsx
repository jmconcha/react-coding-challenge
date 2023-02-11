import { useState, FormEvent } from 'react';
import './App.css';
import { useFetchSynonyms, Synonym } from './hooks/useFetchSynonyms';

function App() {
  const [word, setWord] = useState('');
  const { loading, synonyms, fetchSynonyms } = useFetchSynonyms();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedQuery = word.trim();
    if (trimmedQuery === '') return;

    await fetchSynonyms(word);
  };

  const handleSynonymClick = async (synonym: string) => {
    await fetchSynonyms(synonym);
  };

  const styles = {
    list: {
      textAlign: 'left',
    },
    listItem: {
      cursor: 'pointer',
    },
    button: {
      color: '#fff',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '8px 12px',
      fontSize: '16px',
    },
  } as const;

  return (
    <div className="App">
      <h1>Datamuse API</h1>
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <label htmlFor="query">Your Word</label>
        <input
          id="query"
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} disabled={loading}>
          Find synonym
        </button>
      </form>
      {synonyms.length > 0 && !loading && (
        <ul style={styles.list}>
          {synonyms.map((synonym: Synonym, index: number) => (
            <li
              key={`${synonym.word}-index`}
              onClick={() => handleSynonymClick(synonym.word)}
              style={styles.listItem}
            >
              {synonym.word}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
