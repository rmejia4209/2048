import PowerUpContainer from "@/components/containers/PowerUpContainer"
import GameOverFooter from "@/components/containers/GameOverFooter";
import { shuffledArray } from "../utils/utils";
import { initGame } from "../game/game";
import { useGameContext } from "./context/GameContext";



function GameFooter(): React.JSX.Element {

  const {changeGameState} = useGameContext();

  const resetGame = () => {
    const preferredOrder = shuffledArray(16);
    changeGameState(() => initGame(preferredOrder))
  }

  return (
    <>
      <PowerUpContainer resetGame={resetGame}/>
      <GameOverFooter resetGame={resetGame}/>
    </>
  )
}

export default GameFooter;