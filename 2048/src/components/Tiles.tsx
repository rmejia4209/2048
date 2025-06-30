import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";

import { initGame, move, addRandomTile, isGameOver } from "../game/game";
import { deepCopy } from "../utils/utils";

function Tiles(): React.JSX.Element {

  const [gameState, changeGameState] = useState(initGame)
  const [prevState, setPrevState] = useState(gameState);
  const [didMove, setDidMove] = useState(false);
  const limitInput = useRef(false);

  const undoMove = () => {
    changeGameState((currentState) => {
      setPrevState(currentState);
      return prevState;
    });    
  }
  


  useEffect(() => {
    const handleUserInput = (e: KeyboardEvent) => {

      const acceptedKeys = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]
      if (acceptedKeys.includes(e.key) && !limitInput.current) {
        
        changeGameState((prev) => {
          const nextGameState = deepCopy(prev)
          const moved = move(e.key, nextGameState);
          if (moved) {
            limitInput.current = true
            setDidMove(moved);
            setPrevState(prev);
          }
          return nextGameState;
        });
      }
    }

    window.addEventListener("keydown", handleUserInput);
    return () => window.removeEventListener("keydown", handleUserInput)
  }, [])


  useEffect(() => {

    if (!didMove) return;

    const timeoutId = setTimeout(() => {
      setDidMove(false);
      changeGameState((prev) => {
        const finalState = deepCopy(prev);
        addRandomTile(finalState);
        if (isGameOver(finalState)) console.log("GAME OVER");
        return finalState;
      });
      limitInput.current = false;
    }, 150);

    return () => clearTimeout(timeoutId)

  }, [didMove])


  

  return (
      <div className='relative'>
      <div className={
        `grid grid-cols-4 gap-4 rounded-md border-[1rem]
        bg-neutral-500 border-neutral-500`
      }>
        {Array.from({ length: 16 }, (_, idx) => (
          <div key={idx} className="bg-neutral-400 rounded-sm size-24"></div>
        ))}
      </div>
      <div>
        {gameState.flat().sort((a, b) => a.id - b.id).map((tile) => (
          <Tile
            key={tile.id}
            row={tile.row}
            col={tile.col}
            value={tile.value}/>
        ))}
      </div>
      
      <div>
        <button onClick={undoMove}>Undo</button>
        <button onClick={undoMove}>Redo</button>
      </div>
    </div>
  )
}

export default Tiles;
