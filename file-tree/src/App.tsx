import { useState } from 'react';
import './App.css';

const files = {
  children: [
    {
      name: 'downloads',
      children: [
        {
          name: 'list.txt',
        },
        {
          name: 'tutorials',
          children: [
            {
              name: 'cooking',
              children: [
                {
                  name: 'how to cook chicken.mp4',
                },
                {
                  name: 'cook spaghetti.mp4',
                },
              ],
            },
          ],
        },
        {
          name: 'movies.mp4',
        },
      ],
    },
    {
      name: 'pictures',
      children: [
        {
          name: 'screenshot.png',
        },
        {
          name: 'mountains',
          children: [
            {
              name: 'Mt. Apo.jpeg',
            },
            {
              name: 'Mt. IDK.jpeg',
            },
          ],
        },
      ],
    },
  ],
};

interface IEntry {
  name: string;
  children?: IEntry[];
}

function Entry({ entry, depth }: { entry: IEntry; depth: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ paddingLeft: `${depth * 10}px` }}>
      {entry.children ? (
        <button
          className="btn-entry"
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          {isExpanded ? '-' : '+'} {entry.name}
        </button>
      ) : (
        <p>{entry.name}</p>
      )}
      {isExpanded && entry.children && (
        <RenderEntries entries={entry.children} depth={depth + 1} />
      )}
    </div>
  );
}

function RenderEntries({
  entries,
  depth,
}: {
  entries: IEntry[];
  depth: number;
}) {
  return (
    <>
      {entries.map((entry: IEntry, idx: number) => {
        return <Entry key={idx} entry={entry} depth={depth} />;
      })}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <RenderEntries entries={files.children} depth={0} />
    </div>
  );
}

export default App;
