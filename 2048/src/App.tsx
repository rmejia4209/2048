import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

import GameHeader from "./components/GameHeader";
import GameContainer from './components/Game'
import GameFooter from "./components/GameFooter";

import { initGame } from "./game/game";
import { shuffledArray } from "./utils/utils";


// TODO - accessiblity features

function App(): React.JSX.Element {

  const preferredOrder = shuffledArray(16);
  const [bestScore, setBestScore] = useLocalStorage("best", 0);
  const [gameState, changeGameState] = useLocalStorage("currentGame",
    () => initGame(preferredOrder)
  );
  const currentFrame = gameState.at(-1)!;

  const resetGame = () => {
    const preferredOrder = shuffledArray(16);
    changeGameState(() => initGame(preferredOrder))
  }

  useEffect(() => {
    const score = gameState.at(-1)!.score;
    if (score > bestScore) setBestScore(score);
  }, [gameState])


  return (
    <div className="flex flex-col justify-center min-h-screen">
      <GameHeader
        isGameOver={currentFrame.isGameOver}
        score={currentFrame.score}
        bestScore={bestScore}
        turns={currentFrame.turn}
        stats={currentFrame.powerUpUsage}
        resetGame={resetGame}
      />
      <GameContainer
        gameState={gameState}
        changeGameState={changeGameState}
      />
      <GameFooter
        gameState={gameState}
        changeGameState={changeGameState}
        resetGame={resetGame}
      />
    </div>
  )
}

export default App
