import { useEffect, useRef } from "react";
import Background from "./Background";
import Tiles from "./Tiles";

import type { Game } from "../game/game";
import { move } from "../game/game";

interface GameContainerPropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>;
}

function GameContainer(
  {gameState, changeGameState}: GameContainerPropTypes
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
        <Background/>
        <Tiles gameState={gameState}/>
      </div>
    </div>
    

  )
}

export default GameContainer;
