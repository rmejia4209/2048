import { useEffect, useRef } from "react";
import Background from "./Background";
import Tiles from "./Tiles";

import { move } from "../game/game";
import { randInt, shuffledArray } from "../utils/utils";
import { useGameContext } from "./context/GameContext";


function GameContainer(): React.JSX.Element {

  const { gameState, changeGameState } = useGameContext()
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
    
    const pauseInput = (e: Event) => {
      const customEvent = e as CustomEvent;
      limitInput.current = customEvent.detail;
    }

    window.addEventListener("keydown", handleUserInput);
    window.addEventListener("pause-inputs", pauseInput);
    return () => {
      window.removeEventListener("keydown", handleUserInput);
      window.removeEventListener("keydown", pauseInput);
    }
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
