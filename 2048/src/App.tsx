import { useState } from "react";

import './App.css'
import StatBlock from './components/ScoreStat'
import Tiles from './components/Tiles'


import { initGame } from "./game/game";


function App() {

  const [gameState, changeGameState] = useState(initGame)


  return (
    <>
      <div className="flex flex-row gap-4 items-center">
        <StatBlock label={"Score"} value={gameState.score}/>
        <StatBlock label={"Best"} value={101}/>
      </div>
      <Tiles
        gameState={gameState}
        changeGameState={changeGameState}
      />
    </>
  )
}

export default App
