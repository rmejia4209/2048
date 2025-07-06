import UndoButton from "@/components/buttons//UndoButton";
import RestartGameButton from "@/components/buttons/RestartGameButton"
import type { Game } from "@/game/types";
import SwapButton from "../buttons/SwapButton";

interface PropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>
  resetGame: () => void;
}


function PowerUpContainer(
  { gameState, changeGameState, resetGame }: PropTypes
): React.JSX.Element {
  return (
    <div className={`
      flex flex-row justify-center gap-4 items-start mt-8 bg-neutral-500
      w-72 mx-auto xs:w-96 xl:w-136 rounded-2xl py-2 transition-all
      duration-800 ease-in-out
      ${!gameState.at(-1)!.isGameOver
        ? "opacity-100 max-h-40 scale-100"
        : "opacity-0 max-h-0 scale-0"
      }
    `}>
      <UndoButton gameState={gameState} changeGameState={changeGameState}/>
      <SwapButton gameState={gameState} changeGameState={changeGameState}/>
      <RestartGameButton resetGame={resetGame} />
    </div>
  );
}

export default PowerUpContainer;