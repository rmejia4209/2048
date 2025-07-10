import { useRef } from "react";
import Background from "./Background";
import Tiles from "./Tiles";

import { useGameContext } from "./context/GameContext";


function GameContainer(): React.JSX.Element {

  const { gameState, attemptMove, limitInput } = useGameContext()

  const start = useRef<[number, number]>([0, 0])

  const recordTouchStart = (e: React.TouchEvent) => {
    start.current = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
  }

  const handleSwipe = (e: React.TouchEvent) => {
    const end = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]

    const deltaX = end[0] - start.current[0];
    const deltaY = end[1] - start.current[1];
    let direction: string
    if (Math.abs(deltaX) < 30 && Math.abs(deltaY) < 30) return;
    if (Math.abs(deltaY) - Math.abs(deltaX) > 0) {
      direction = deltaY > 0 ? "down" : "up"
    } else {
      direction = deltaX > 0 ? "right" : "left"
    }
    if (!limitInput.current) attemptMove(direction);
  }

  return (
    <div className="w-full">
      <div
        onTouchStart={recordTouchStart}
        onTouchEnd={handleSwipe}
        className={`
          relative w-max mx-auto transition-all duration-800 ease-in-out touch-none
          ${
            gameState.at(-1)!.isGameOver
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
