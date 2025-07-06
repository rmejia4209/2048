import PowerUpContainer from "@/components/containers/PowerUpContainer"
import GameOverFooter from "@/components/containers/GameOverFooter";
import type { Game } from "../game/types";
import { shuffledArray } from "../utils/utils";
import { initGame } from "../game/game";


interface PropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>
  resetGame?: () => void;
}


function GameFooter(
  {gameState, changeGameState}: PropTypes
): React.JSX.Element {

    const resetGame = () => {
      const preferredOrder = shuffledArray(16);
      changeGameState(() => initGame(preferredOrder))
    }

  return (
    <>
      <PowerUpContainer
        gameState={gameState}
        changeGameState={changeGameState}
        resetGame={resetGame}
      />
      <GameOverFooter
        gameState={gameState}
        changeGameState={changeGameState}
        resetGame={resetGame}
      />
    </>
  )
}

export default GameFooter;