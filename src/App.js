//import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import React from 'react';

let turnCount = 0;

/* Creates A square on board */
function Square({value, onSquareClick, color})
{
  return(<button className="square" onClick={onSquareClick} style={{backgroundColor:color}}>{value}</button>);
}

function calculateWinner(squares)
{
   const lines = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ]

  for (let i = 0; i < lines.length; i++) 
  {
    const [a, b, c, d] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d])
      return squares[a];
  }
}

export default function Board() 
{
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(42).fill(null));
  const [squareVals, setSquareVals] = useState(Array(42).fill(null));


  const winner = calculateWinner(squareVals);


  function handleClick(i)
  {
    let index = Number(i);
    if (winner || squares[i])
      return;
    else 
    {
      for(let j = 0; j < 5; j++)
      {
        if(index+7<42 && squares[index+7]==null)
          index+=7;
        else break;
      }
      turnCount++;
    }

  const nextSquares = squares.slice();
  const nextSquareVals = squareVals.slice();
  
  if (xIsNext)
  {
    nextSquareVals[index] = 'Red';
    nextSquares[index] = (<Square value={squares[index]} onSquareClick={() => handleClick(index)} color={"pink"} />)
  }else
  { 
    nextSquareVals[index] = 'Yellow';
    nextSquares[index] = (<Square value={squares[index]} onSquareClick={() => handleClick(index)} color={"yellow"} />)
  }
    setSquares(nextSquares);
    setSquareVals(nextSquareVals);
    setXIsNext(!xIsNext);
  }

  let status;
  if (winner) 
    status = "Winner : " + winner;
  else if(turnCount >= 42)
    status = "It's a tie!"
  else 
    status = "Next player : " + (xIsNext ? "Red" : "Yellow");

  function AddRows({position})
  {
    let end = Number(position) + 7;
    let row = [];

    for(let i = position; i < end; i++)
      row.push(<Square value={squares[i]} onSquareClick={() => handleClick(i)} color={"black"} />);
      
    return <div className="board-row">{row}</div>;
  }

  return (
    <>
      <div className="status">{status}</div>
      <AddRows position = '0'/>
      <AddRows position = '7'/>
      <AddRows position = '14'/>
      <AddRows position = '21'/>
      <AddRows position = '28'/>
      <AddRows position = '35'/>
    </>
  );
}
