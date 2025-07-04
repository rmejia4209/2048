import { useState } from "react";

import GameHeader from "./components/GameHeader";
import GameContainer from './components/Game'
import PowerUpContainer from "./components/PowerUpContainer";

import { initGame } from "./game/game";
import { shuffle } from "./utils/utils";

// TODO - accessiblity features

function App(): React.JSX.Element {

  const preferredOrder = shuffle(Array.from({length: 16}, (_, i) => i));
  const [gameState, changeGameState] = useState(
    () => initGame(preferredOrder)
  );

  const resetGame = () => {
    const preferredOrder = shuffle(Array.from({length: 16}, (_, i) => i));
    changeGameState(() => initGame(preferredOrder))
  }

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <GameHeader
        score={gameState[gameState.length - 1].score}
        resetGame={resetGame}
      />
      <GameContainer
        gameState={gameState}
        changeGameState={changeGameState}
      />
      <PowerUpContainer
        gameState={gameState}
        changeGameState={changeGameState}
      />
    </div>
  )
}

export default App
