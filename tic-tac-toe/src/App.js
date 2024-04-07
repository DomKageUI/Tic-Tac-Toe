import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    if (checkWinner(updatedBoard, currentPlayer)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board, player) => {
    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }

    return false;
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="square-container">
            {renderSquare(index)}
          </div>
        ))}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="App">
      <h1>Doms's Tic Tac Toe</h1>
      {winner && <p>Winner: {winner}</p>}
      {!winner && <p>Current Player: {currentPlayer}</p>}
      {renderBoard()}
      {winner && <button onClick={resetGame}>Play Again</button>}
    </div>
  );
};

export default App;
