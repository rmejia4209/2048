

import { useGameContext } from "@/components/context/GameContext";
import Button from "@/components/base/Button";
import { useState, useRef } from "react";
import { pureMonteCarloSearch } from "@/game/autoSolver";

/**
 * Temp Component to store AI work
 */


export function AI_Player(): React.JSX.Element {

  const { attemptMove, getLatestState } = useGameContext()
  const [isRunning, setIsRunning] = useState(false)
  const isRunningRef = useRef(false);


  const runAI = async () => {
    while (isRunningRef.current) {
      const latestState = getLatestState()
      const bestMove = pureMonteCarloSearch(latestState.at(-1)!.board);
      if (!bestMove) break;

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
    <Button
      txt={isRunning ? "Stop" : "Start"}
      onClick={toggleAI}
    />
  )
}
