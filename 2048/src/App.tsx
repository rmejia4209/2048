import { useState, useRef } from "react";

import './App.css'
import StatBlock from './components/ScoreStat'
import Tiles from './components/Tiles'
import Undo from "./components/UndoButton";

import Title from "./components/Title";
import type { Game } from "./game/game";
import { initGame } from "./game/game";


function App() {


  const [gameState, changeGameState] = useState(initGame);
  const prevStates = useRef<Game[]>([]);

  const updatePrevStates = (currentState: Game) => {
    prevStates.current.push(currentState);
    if (prevStates.current.length === 5) prevStates.current.shift();
  }

  const undoMove = () => {
    const lastState = prevStates.current.pop()
    if (lastState) changeGameState(lastState);
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="flex flex-row gap-4 items-center mb-8">
        <Title />
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

      <div className="flex justify-center flex-row gap-4 items-center mb-8">
        <Undo onClick={undoMove}/>
      </div>
    </div>
  )
}

export default App
