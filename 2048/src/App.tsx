import { useState, useEffect } from "react";

import GameHeader from "./components/GameHeader";
import GameContainer from './components/Game'
import PowerUpContainer from "./components/PowerUpContainer";
import { Button } from "./components/GameHeader";

import { initGame, isGameOver } from "./game/game";
import { shuffledArray } from "./utils/utils";

// TODO - accessiblity features

function App(): React.JSX.Element {

  const preferredOrder = shuffledArray(16);
  const [gameState, changeGameState] = useState(
    () => initGame(preferredOrder)
  );

  const resetGame = () => {
    const preferredOrder = shuffledArray(16);
    changeGameState(() => initGame(preferredOrder))
  }

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log(`Is game over: ${isGameOver(gameState)}`)
  }, [gameState])


  return (
    <div className="flex flex-col justify-center min-h-screen">
      <Button txt={"Hide Me"} onClick={() => {setIsOpen(!isOpen)}}/>
      <GameHeader
        isOpen={isOpen}
        score={gameState[gameState.length - 1].score}
        turns={gameState[gameState.length - 1].turn}
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
