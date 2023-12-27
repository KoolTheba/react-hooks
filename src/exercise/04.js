// useState: tic tac toe

import * as React from 'react'
import { useLocalStorageState } from '../utils';

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Board({onClick, squares}) {
  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const initialState = Array(9).fill(null);
  
  const [history, setHistory] = useLocalStorageState('history', [initialState])
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)

  const isCurrentStep = (i) => i === currentStep;
  const onGameStart = (i) => i === 0 ? 'Go to game start ' : `Go to move #${i}`;

  const moves = history.map((_, i) => {
    return (
      <li key={i}>
        <button
          onClick={() => setCurrentStep(i)}
          disabled={isCurrentStep(i)}
        >{`${onGameStart(i)} ${isCurrentStep(i) ? '(current)' : ''}`}
      </button>
      </li>
    )
  });

  const currentSquares = history[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  const selectSquare = (i) => {
    if(winner || currentSquares[i]){
      return;
    }

    const newHistory = history.slice(0, currentStep + 1);  
    const turnArray = [...currentSquares];
    turnArray[i] = nextValue;
    setHistory([...newHistory, turnArray])
    setCurrentStep((currentStep) => currentStep + 1)
  }

  const restart = () => {
    setHistory([initialState])
    setCurrentStep(0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
      <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function App() {
  return <Game />
}

export default App
