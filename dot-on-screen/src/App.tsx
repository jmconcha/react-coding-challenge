import React, { useState } from 'react';
import Box from './components/Box';
import Controls from './components/Controls';

import styles from './App.module.css';

function App() {
  const [boxes, setBoxes] = useState<{ x: number; y: number }[]>([]);
  const [lastBoxIndex, setLastBoxIndex] = useState(-1);
  const filteredBoxes = boxes.slice(0, lastBoxIndex + 1);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX - 5;
    const y = e.clientY - 5;

    setBoxes((prevState) => [
      ...prevState.slice(0, lastBoxIndex + 1),
      { x, y },
    ]);
    setLastBoxIndex(boxes.length);
  };

  const handleUndo = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();

    if (lastBoxIndex < 0) return;

    setLastBoxIndex((prevState) => prevState - 1);
  };

  const handleRedo = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();

    if (boxes.length - 1 === lastBoxIndex) return;

    setLastBoxIndex((prevState) => prevState + 1);
  };

  return (
    <div data-testid="app" className={styles.app} onClick={handleClick}>
      <Controls onUndo={handleUndo} onRedo={handleRedo} />
      {filteredBoxes.map((box, index) => (
        <Box key={`${index}-${box.x}-${box.y}`} box={box} />
      ))}
    </div>
  );
}

export default App;
