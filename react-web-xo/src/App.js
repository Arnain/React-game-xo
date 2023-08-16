import React, { useState } from "react";
import { Board } from "./components/Board";
import { ScoreBoard } from "./components/ScoreBoard";
import axios from 'axios';
import './App.css';

const App = () => {
  const [inputSize, setInputSize] = useState(3); 
  const [size,setSize] = useState(inputSize);
  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(size*size).fill(null))
  const [gameOver, setGameOver] = useState(false);
  
  function handleBoxClick(cell) {
    const updatedBoard = board.map((value, idx) => {
      if (idx === cell) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    })
    setBoard(updatedBoard);
    if (checkWinner(updatedBoard)) {
      setGameOver(true);
      const dataWin = checkWinner(updatedBoard);
      console.log('Check',dataWin);
      axios.post('http://localhost:5000/insert', {
        win: dataWin,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    setXPlaying(!xPlaying);
  }

  function checkWinner(updatedBoard) {
    const cells = updatedBoard;
    const size = Math.sqrt(cells.length);
    const winningCombos = generateWinningCombos(size);

    for (const combo of winningCombos) {
      const values = combo.map((cellIndex) => cells[cellIndex]);

      if (values.every((value) => value === "X")) {
        return "X";
      } else if (values.every((value) => value === "O")) {
        return "O";
      }
    }
    return null;
  }
  function generateWinningCombos(size) {
    const winningCombos = [];
    for (let i = 0; i < size; i++) {
      const rowCombo = [];
      const colCombo = [];
      for (let j = 0; j < size; j++) {
        rowCombo.push(i * size + j);
        colCombo.push(j * size + i);
      }
      winningCombos.push(rowCombo, colCombo);
    }

    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
      diagonal1.push(i * (size + 1));
      diagonal2.push((i + 1) * (size - 1));
    }

    winningCombos.push(diagonal1, diagonal2);
    return winningCombos;
  }
  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(size*size).fill(null));
  }
  const handleSetSize = () => {
    setSize(inputSize);
    setBoard(Array(inputSize * inputSize).fill(null));
    setXPlaying(true);
    setGameOver(false);
  };
  return (
    <div className="App">
      <h2 className="text-title">Tic-Tac-Toe (XO) Game</h2>
      <p className="text2">Please enter the size you want to play. (size : 3-10)</p>
      <div className="form-row">
        <label className="text">Board Size: </label>
        <input
          type="number"
          name="size"
          id="size"
          className="text-input"
          value={inputSize}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 3 && value <= 10) {
              setInputSize(value);
            }
          }}
        />
        <button className="btn" type="button" name="submitSize"  onClick={handleSetSize}>Set Size</button>
      </div>
      
        <ScoreBoard xPlaying={xPlaying} />
        <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} size={size} key="board"/>
      <div className="certer">
        <button className="reset-btn" onClick={resetBoard}>Reset</button>
        <button className="history-btn" onClick={
          (e) =>{
            e.preventDefault();
            window.location = '/show';
          }}>History play</button>
      </div>
    </div>
  );
}

export default App;
