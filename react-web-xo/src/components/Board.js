import React from 'react'

import { Box } from "./Box"
import "./Board.css"

export const Board = ({ board, onClick,size }) => {
  return (
    <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 6rem)` }}>
      {
        board.map((value, idx) => {
          return <Box key={idx} value={value} onClick={() => value === null && onClick(idx)} />;
        })
      }
    </div>
  )
}
