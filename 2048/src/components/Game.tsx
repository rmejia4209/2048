import { useEffect, useRef } from "react";
import Background from "./Background";
import Tiles from "./Tiles";

import type { Game } from "../game/types";
import { move } from "../game/game";
import { randInt, shuffledArray } from "../utils/utils";

interface GameContainerPropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>;
}

function GameContainer(
  {gameState, changeGameState}: GameContainerPropTypes
): React.JSX.Element {

  const limitInput = useRef(false);


  useEffect(() => {
    const handleUserInput = (e: KeyboardEvent) => {
      const acceptedKeys = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]
      if (acceptedKeys.includes(e.key) && !limitInput.current) {
        const val = randInt(1, 3) * 2;
        const preferredOrder = shuffledArray(16);
        changeGameState((prev) => move(e.key, prev, val, preferredOrder));
        }
      }

    window.addEventListener("keydown", handleUserInput);
    return () => window.removeEventListener("keydown", handleUserInput);
  }, [])

  useEffect(() => {
    limitInput.current = true;
    if (gameState[gameState.length - 1].isGameOver) return;
    const timeOutId = setTimeout(() => (limitInput.current = false), 150);
    return () => clearTimeout(timeOutId);
  }, [gameState])


  return (
    <div className="w-full overflow-x-auto">
      <div
        className={`
          relative w-max mx-auto transition-all duration-800 ease-in-out
          ${gameState.at(-1)!.isGameOver
            ? (`
              before:absolute before:inset-0 before:bg-neutral-800
              before:opacity-40 before:z-10 scale-90 origin-top
            `)
            : "scale-100"
          }

        `}
      >
        <Background/>
        <Tiles gameState={gameState}/>
      </div>
    </div>
    

  )
}

export default GameContainer;
