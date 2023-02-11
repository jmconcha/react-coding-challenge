import { useState, useRef, useEffect, useMemo } from 'react';
import './App.css';

interface IBoxProps {
  val: number;
  onBoxClick: () => void;
  show: boolean;
}

const boardState = [0, 3, 1, 2, 6, 5, 4, 3, 0, 7, 1, 2, 4, 7, 5, 6];

function debounce(callback: () => void, duration: number) {
  const timerId = setTimeout(callback, duration);
  return timerId;
}

function Box(props: IBoxProps) {
  const { val, onBoxClick, show: showBoxPerm } = props;
  const [show, setShow] = useState(false);
  const timerIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (show && timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current);
    }

    timerIdRef.current = debounce(() => {
      setShow(false);
    }, 500);
  }, [show]);

  const handleBoxClick = () => {
    setShow((prevState) => !prevState);
    onBoxClick();
  };

  return (
    <div className="box" onClick={handleBoxClick}>
      {showBoxPerm || show ? val : ''}
    </div>
  );
}

function App() {
  const [lastTwoMoves, setLastTwoMoves] = useState<[number, number]>([-1, -1]);
  const [playerHasMatch, setPlayerHasMatch] = useState<number[]>([]);
  console.log('🚀 ~ file: App.tsx:46 ~ App ~ playerHasMatch', playerHasMatch);
  console.log('🚀 ~ file: App.tsx:23 ~ App ~ lastTwoMoves', lastTwoMoves);

  const handleBoxClick = (index: number) => {
    setLastTwoMoves([lastTwoMoves[1], index]);
  };

  if (
    lastTwoMoves[0] !== -1 &&
    lastTwoMoves[1] !== -1 &&
    lastTwoMoves[0] !== lastTwoMoves[1] &&
    boardState[lastTwoMoves[0]] === boardState[lastTwoMoves[1]]
  ) {
    console.log('match!');
    setPlayerHasMatch((prevState) => [
      ...prevState,
      boardState[lastTwoMoves[0]],
    ]);
    setLastTwoMoves([-1, -1]);
  }

  const playerWon = useMemo(() => {
    const sum = playerHasMatch.reduce((accum, num) => {
      return accum + num;
    }, 0);

    return sum === 28;
  }, [playerHasMatch]);

  return (
    <div className="App">
      {playerWon && (
        <h1 className="winner-banner">You won! Congratulations!</h1>
      )}
      <div className="board">
        {boardState.map((val, index) => (
          <Box
            key={index}
            val={val}
            onBoxClick={() => handleBoxClick(index)}
            show={playerHasMatch.some((el) => el === val)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
