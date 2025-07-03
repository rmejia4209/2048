import { useState, useRef } from "react";

import GameHeader from "./components/GameHeader";
import Tiles from './components/Tiles'
import PowerUpContainer from "./components/PowerUpContainer";

import type { Game } from "./game/game";
import { initGame } from "./game/game";

// TODO - accessiblity features

function App(): React.JSX.Element {

  const [gameState, changeGameState] = useState(initGame);
  const prevStates = useRef<Game[]>([]);

  const undoMove = () => {
    const lastState = prevStates.current.pop()
    if (lastState) changeGameState(lastState);
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <GameHeader
        score={gameState.score}
        resetGame={() => {
          changeGameState(initGame());
          prevStates.current = [];
        }}
      />
      <Tiles
        gameState={gameState}
        changeGameState={changeGameState}
        prevStates={prevStates}
      />
      <PowerUpContainer onClick={undoMove} />
    </div>
  )
}

export default App
