import PowerUpContainer from "@/components/containers/PowerUpContainer"
import Button from "@/components/base/Button";

import type { Game } from "../game/types";
import { undoMove } from "../game/game";
import { shuffledArray } from "../utils/utils";
import { initGame } from "../game/game";


interface PropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>
  resetGame?: () => void;
}


function GameOverFooter(
  {gameState, changeGameState, resetGame}: PropTypes
): React.JSX.Element {
  const numUndos = gameState.at(-1)!.powerups.undos
  return (
    <div className="relative h-fit">
      <div
        className={`
          absolute flex flex-col -top-12 left-1/2 -translate-x-1/2 w-72 xs:w-96
          xl:w-136 transition-all duration-800 ease-in-out
          ${gameState.at(-1)!.isGameOver
            ? "opacity-100 max-h-40 scale-100"
            : "opacity-0 max-h-0 scale-0"
          }
        `}
      >
        <div
          className={`flex flex-col xs:flex-row justify-center items-center gap-4`}
        > 
          <Button
            className="flex-1 text-lg"
            txt="New Game"
            onClick={resetGame!}
          />

          {numUndos > 0
          ? (
            <Button
              className="flex-1 text-lg"
              txt="Undo"
              onClick={() => {changeGameState((prev) => undoMove(prev))}}
            />
          )
          : null
          }
        </div>
        {numUndos > 0
          ? (
            <span className="text-center self-center m-2 w-full">
              You have {numUndos} undo{numUndos > 1 ? "s " : " "}left.
            </span>
          )
          : null
        }
        </div>
        
      </div>

  )
}

function GameFooter(
  {gameState, changeGameState}: PropTypes
): React.JSX.Element {

    const resetGame = () => {
      const preferredOrder = shuffledArray(16);
      changeGameState(() => initGame(preferredOrder))
    }

  return (
    <>
      <PowerUpContainer
        gameState={gameState}
        changeGameState={changeGameState}
        resetGame={resetGame}
      />
      <GameOverFooter
        gameState={gameState}
        changeGameState={changeGameState}
        resetGame={resetGame}
      />
    </>
  )
}

export default GameFooter;