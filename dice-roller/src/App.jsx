import { useState, useRef } from 'react';

function DiceFace({ diceFaceNum }) {
  const circles = (new Array(diceFaceNum)).fill(0);
  return (
    <div className={`dice-container dice-${diceFaceNum}`}>
      {circles.map((_, idx) => (
        <div key={idx} className={`dice-circle dice-circle-${idx + 1}`}></div>
      ))}
    </div>
  );
}

export default function App() {
  const [rolls, setRolls] = useState([]);
  const inputRef = useRef(null);

  const handleRoll = () => {
    const newRolls = [];
    const rollsCount = inputRef.current.value;
    for (let i = 0; i < rollsCount; i++) {
      newRolls.push(Math.floor(Math.random() * 6) + 1);
    }
    setRolls(newRolls);
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <span>Number of dice</span>
        <br />
        <input ref={inputRef} type="number" />
        <button style={{ marginLeft: '10px' }} onClick={handleRoll}>Roll</button>
      </div>
      {rolls.length > 0 && (
        <div className="rolls-result-container">
          {rolls.map(rollNum => (
            <DiceFace diceFaceNum={rollNum} />
          ))}
        </div>
      )}
    </>
  );
}
