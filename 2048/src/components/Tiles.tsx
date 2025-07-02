import { useEffect, useRef } from "react";
import Tile from "./Tile";

import type { Game } from "../game/game";
import { move } from "../game/game";

interface TilesPropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>;
  updatePrevStates: (currentState: Game) => void;
}

function Tiles(
  {gameState, changeGameState, updatePrevStates}: TilesPropTypes
): React.JSX.Element {

  const limitInput = useRef(false);
  const prevGameState = useRef(gameState)


  useEffect(() => {
    const handleUserInput = (e: KeyboardEvent) => {
      const acceptedKeys = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]
      if (acceptedKeys.includes(e.key) && !limitInput.current) {
        changeGameState((prev) => move(e.key, prev));
        }
      }

    window.addEventListener("keydown", handleUserInput);
    return () => window.removeEventListener("keydown", handleUserInput)
  }, [])

  useEffect(() => {
    
    if (prevGameState.current.turn >= gameState.turn) {
      prevGameState.current = gameState;
      return;
    }
    updatePrevStates(prevGameState.current);
    limitInput.current = true;
    prevGameState.current = gameState;
    const timeOutId = setTimeout(() => (limitInput.current = false), 300);
    return () => clearTimeout(timeOutId);
  }, [gameState])

  

  return (
      <div className='relative'>
      <div className={
        `grid grid-cols-4 gap-4 rounded-md border-[1rem]
        bg-neutral-500 border-neutral-500`
      }>
        {Array.from({ length: 16 }, (_, idx) => (
          <div key={idx} className="bg-neutral-400 rounded-md size-24"></div>
        ))}
      </div>
      <div>
        {gameState.board.flat().sort((a, b) => a.id - b.id).map((tile) => (
          <Tile
            key={tile.id}
            row={tile.row}
            col={tile.col}
            value={tile.value}/>
        ))}
      </div>
    </div>
  )
}

export default Tiles;
