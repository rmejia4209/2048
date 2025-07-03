import { useEffect, useRef } from "react";
import Tile from "./Tile";

import type { Game } from "../game/game";
import { move } from "../game/game";

interface TilesPropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>;
}

function Tiles(
  {gameState, changeGameState}: TilesPropTypes
): React.JSX.Element {

  const limitInput = useRef(false);


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
    limitInput.current = true;
    const timeOutId = setTimeout(() => (limitInput.current = false), 300);
    return () => clearTimeout(timeOutId);
  }, [gameState])


  return (
    <div className="w-full overflow-x-auto">
      <div className='relative w-max mx-auto'>
        <div className={`
          grid grid-cols-4 rounded-2xl gap-2 border-[0.5rem] xl:gap-4
          xl:border-[1rem] bg-neutral-600 border-neutral-600
          transition-all duration-150
          
        `}>
          {Array.from({ length: 16 }, (_, idx) => (
            <div
              key={idx}
              className="bg-neutral-500 rounded-2xl size-16 xs:size-24 xl:size-30 transition-all duration-100"
            >
            </div>
          ))}
        </div>
        <div>
          {gameState[gameState.length - 1].board.flat().sort(
            (a, b) => a.id - b.id).map((tile) => (
              <Tile
                key={tile.id}
                row={tile.row}
                col={tile.col}
                value={tile.value}/>
            )
          )}
        </div>

      </div>
    </div>
    

  )
}

export default Tiles;
