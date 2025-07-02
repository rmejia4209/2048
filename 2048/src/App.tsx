import { useState, useEffect, useRef } from "react";

import './App.css'
import StatBlock from './components/ScoreStat'
import Tiles from './components/Tiles'
import Undo from "./components/UndoButton";

import type { Game } from "./game/game";
import { initGame } from "./game/game";


function App() {


  const [gameState, changeGameState] = useState(initGame);
  const prevStates = useRef<Game[]>([]);

  const updatePrevStates = (currentState: Game) => {
    prevStates.current.push(currentState);
    if (prevStates.current.length === 5) prevStates.current.shift();
  }

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
        updatePrevStates={updatePrevStates}
      />
      <div className="flex flex-row gap-4 items-center mb-8">
        <Undo/>
      </div>
    </>
  )
}

export default App
