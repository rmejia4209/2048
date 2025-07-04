
import Button from "./base/Button";
import PowerUpUsageStats from "./PowerUpUsageStats";
import StatBlock from "./base/StatBlock";

import type {PowerUpUsageStats as PowerUpUsageStatsType} from "../game/types";



interface InGameHeaderPropTypes {
  isGameOver: boolean; score: number; resetGame: () => void;
}

function InGameHeader(
  { isGameOver, score, resetGame }: InGameHeaderPropTypes
): React.JSX.Element {
  return (
    <div className={`
      flex flex-row items-start w-72 mx-auto mb-4 gap-6
      xs:w-96 xs:gap-4 xl:w-136 xl:gap-64 transition-all duration-800
      ${!isGameOver
        ? "opacity-100 max-h-40 scale-100"
        : "opacity-0 max-h-0 scale-0"
      }
    `}>

      <div>
        <h1 className="text-4xl xs:text-6xl font-extrabold text-stone-100">
          2048
        </h1>
        <p className="text-sm text-stone-300 leading-snug mt-1">
          Join the numbers and get to the 2048 tile!
        </p>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <div className="flex flex-row gap-2">
          <StatBlock label={"Score"} value={score}/>
          <StatBlock label={"Best"} value={score}/>
        </div>
        <Button txt={"New Game"} onClick={resetGame}/>
      </div>

    </div>
  )
}

interface GameOverHeaderPropTypes {
  isGameOver: boolean;
  score: number;
  turns: number;
  stats: PowerUpUsageStatsType;
}

function GameOverHeader(
  { isGameOver, score, turns, stats }: GameOverHeaderPropTypes
): React.JSX.Element {
  const powerUpsUsed = Object.values(stats).reduce((sum, val) => sum + val, 0);
  return(
    <div
      className={`
        flex flex-col items-center w-full mx-auto gap-2 xs:w-120 xl:w-164
        transition-all duration-800 ease-in-out overflow-hidden
        ${isGameOver
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
      <div>
        <span className="text-md text-stone-100">
          {score.toLocaleString()} points scored in {turns.toLocaleString()} moves.{" "}
        </span>
        <span className="text-md font-bold text-stone-100">
        {powerUpsUsed === 0
        ? "No powerups used!"
        : `${powerUpsUsed.toLocaleString()} powerup${powerUpsUsed > 1 ? "s ": " "}used:`
        }
        </span>

      </div>
      <PowerUpUsageStats stats={stats} />
    </div>

  );
}


interface GameHeaderPropTypes {
  isGameOver: boolean;
  score: number;
  turns: number;
  stats: PowerUpUsageStatsType;
  resetGame: () => void;
}

function GameHeader(
  { isGameOver, score, turns, stats, resetGame }: GameHeaderPropTypes
): React.JSX.Element {
  return (
    <>
      <GameOverHeader
        isGameOver={isGameOver}
        score={score}
        turns={turns}
        stats={stats}
      />
      <InGameHeader
        isGameOver={isGameOver}
        score={score}
        resetGame={resetGame}
      />
    </>
  )
}

export default GameHeader;