import React from 'react'

import "./ScoreBoard.css"

export const ScoreBoard = ({xPlaying }) => {
  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xPlaying && "inactive"}`}>X </span>
      <span className={`score o-score ${xPlaying && "inactive"}`}>O</span>
    </div>
  )
}
