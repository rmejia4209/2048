import { useState } from "react";

import GameHeader from "./components/GameHeader";
import Tiles from './components/Tiles'
import PowerUpContainer from "./components/PowerUpContainer";

import { initGame } from "./game/game";

// TODO - accessiblity features

function App(): React.JSX.Element {

  const [gameState, changeGameState] = useState(initGame);

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <GameHeader
        score={gameState[gameState.length - 1].score}
        resetGame={() => changeGameState(initGame())}
      />
      <Tiles
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
