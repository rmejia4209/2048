import PowerUpUsageStats from "./containers/PowerUpUsageStats";
import StatBlock from "./base/StatBlock";

import { useGameContext } from "./context/GameContext";



function InGameHeader(): React.JSX.Element {

  const { gameState, bestScore } = useGameContext();
  const score = gameState.at(-1)!.score;
  const isGameOver = gameState.at(-1)!.isGameOver

  return (
    <div className={`
      flex flex-col items-end w-fit mx-auto mb-4 gap-1 xs:w-100
       xl:w-136 transition-all duration-800 ease-in-out
      ${!isGameOver
        ? "opacity-100 max-h-40 scale-100"
        : "opacity-0 max-h-0 scale-0"
      }
    `}>
      <div className="flex flex-row gap-6">
        <StatBlock label={"Score"} value={score}/>
        <StatBlock label={"Best"} value={bestScore}/>
      </div>

    </div>
  )
}



function GameOverHeader(): React.JSX.Element {

  const { gameState } = useGameContext()
  const currentFrame = gameState.at(-1)!

  const powerUpsUsed = Object.values(currentFrame.powerUpUsage).reduce(
    (sum, i) => sum + i, 0
  );
  const score = currentFrame.score

  return(
    <div
      className={`
        flex flex-col items-center w-full mx-auto gap-2 xs:w-120 xl:w-164
        transition-all duration-800 ease-in-out overflow-hidden
        ${currentFrame.isGameOver
          ? "opacity-100 scale-100 max-h-80"
          : "opacity-0 scale-0 max-h-0"
        }
      `}
    >
      <h1
        className={`
          text-4xl xs:text-5xl font-extrabold text-stone-100 tracking-tight
        `}
      >
        Game Over
      </h1>
      <div className="flex flex-col items-center">
        <span className="text-md text-stone-100">
          {score.toLocaleString()} points scored in {currentFrame.turn.toLocaleString()} moves.{" "}
        </span>
        <span className="text-md font-bold text-stone-100">
        {powerUpsUsed === 0
        ? "No powerups used!"
        : `${powerUpsUsed.toLocaleString()} powerup${powerUpsUsed > 1 ? "s ": " "}used:`
        }
        </span>

      </div>
      <PowerUpUsageStats/>
    </div>

  );
}

function GameHeader(): React.JSX.Element {
  return (
    <>
      <GameOverHeader/>
      <InGameHeader/>
    </>
  )
}

export default GameHeader;