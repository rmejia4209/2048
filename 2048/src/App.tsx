import { useState, useRef } from "react";

import Tiles from './components/Tiles'
import Undo from "./components/UndoButton";

import GameHeader from "./components/GameHeader";
import type { Game } from "./game/game";
import { initGame } from "./game/game";


function App() {


  const [gameState, changeGameState] = useState(initGame);
  const prevStates = useRef<Game[]>([]);

  const updatePrevStates = (currentState: Game) => {
    prevStates.current.push(currentState);
    if (prevStates.current.length === 5) prevStates.current.shift();
  }

  const resetGame = () => {
    changeGameState(initGame());
    prevStates.current = [];
  }

  const undoMove = () => {
    const lastState = prevStates.current.pop()
    if (lastState) changeGameState(lastState);
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <GameHeader score={gameState.score} resetGame={resetGame}/>
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
