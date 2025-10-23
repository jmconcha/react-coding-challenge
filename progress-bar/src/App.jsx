import { useState } from 'react';

function ProgressBar() {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-percent"></div>
    </div>
  );
}

export default function App() {
  const [progBars, setProgBars] = useState([]);

  const handleClick = () => {
    setProgBars([ ...progBars, progBars.length + 1 ]);
  };

  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <div style={{ marginTop: '20px' }}>
        {progBars.map(barId => (
          <ProgressBar key={barId} />
        ))}
      </div>
    </div>
  );
}
