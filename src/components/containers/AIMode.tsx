

import { useGameContext } from "@/components/context/GameContext";
import Button from "@/components/base/Button";
import { useState, useRef } from "react";
import { getHexRepresentation } from "@/game/game";
import pmcsNextMove from "@/ai/pmcs";



export default function AIPlayer(): React.JSX.Element {

  const { gameState, currGameMode, attemptMove, getLatestState } = useGameContext()
  const [isRunning, setIsRunning] = useState(false)
  const isRunningRef = useRef(false);


  const runAI = async () => {
    while (isRunningRef.current) {
      const latestState = getLatestState();
      const hexString = getHexRepresentation(latestState.at(-1)!.board);
      let bestMove: string;
      try {
        bestMove = await pmcsNextMove(hexString);
      } catch (err) {
        console.error(err);
        break;
      }
    
      if (bestMove.length === 0 || latestState.at(-1)!.isGameOver) break;

      await animateAndApplyMove(bestMove);
    }
    setIsRunning(false);
    isRunningRef.current = false;
  }

  const animateAndApplyMove = async (move: string) => {
    attemptMove(move);
    await new Promise((res) => setTimeout(res, 400))
  }

  const toggleAI = () => {
    const nextState = !isRunning
    setIsRunning(nextState);
    isRunningRef.current = nextState;
    if (nextState) runAI();
  }



  return (
    <div
      className={`
        flex flex-col gap-2 w-72 mx-auto xs:w-96 xl:w-136 transition-all
        duration-800 ease-in-out
        ${
          !gameState.at(-1)!.isGameOver && currGameMode === 'ai'
          ? "opacity-100 max-h-40 pointer-events-auto scale-100"
          : "opacity-0 max-h-0 pointer-events-none scale-0"
        }
      `}
    >
      <div className="flex flex-row w-full">
        {/*TODO: add dropdown here when more models are available*/}
        <Button
          className="flex-1"
          txt={isRunning ? "Stop" : "Start"}
          onClick={toggleAI}
        />
      </div>
      {/*TODO: connect descriptions to models*/}
      <span className="text-sm text-stone-100 text-pretty">
        The pure Monte Carlo search tries stuff at random and picks whatever works best. Pure vibes, no strategy.
      </span>
    </div>
  )
}
