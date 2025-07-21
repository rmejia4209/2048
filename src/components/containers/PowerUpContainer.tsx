import UndoButton from "@/components/buttons//UndoButton";
import SwapButton from "../buttons/SwapButton";
import { useGameContext } from "../context/GameContext";


function PowerUpContainer(): React.JSX.Element {

  const { gameState, currGameMode } = useGameContext();

  return (
    <div className={`
      flex flex-row justify-center gap-4 items-start mt-8 bg-neutral-500
      w-72 mx-auto xs:w-96 xl:w-136 rounded-2xl py-2 transition-all
      duration-800 ease-in-out
      ${
        !gameState.at(-1)!.isGameOver && currGameMode === 'power'
        ? "opacity-100 max-h-40 pointer-events-auto scale-100"
        : "opacity-0 max-h-0 pointer-events-none scale-0"
      }
    `}>
      <UndoButton/>
      <SwapButton/>
    </div>
  );
}

export default PowerUpContainer;