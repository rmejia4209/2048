import { useState } from "react";

import './App.css'
import StatBlock from './components/ScoreStat'
import Tiles from './components/Tiles'


import { initGame } from "./game/game";


function App() {

  const [gameState, changeGameState] = useState(initGame)


  return (
    <>
      <div className="flex flex-row gap-4 items-center mb-8">
        <h1>2048</h1>
        <StatBlock label={"Score"} value={gameState.score}/>
        <StatBlock label={"Best"} value={101}/>
      </div>
      <div className="flex flex-row gap-4 items-center mb-8">
        <p>Game introduction here</p>
        <button>New Game</button>
      </div>
      <Tiles
        gameState={gameState}
        changeGameState={changeGameState}
      />
      <div className="flex flex-row gap-4 items-center mb-8">
        <button>power up</button>
        <button>power up</button>
        <button>power up</button>
      </div>
    </>
  )
}

export default App
