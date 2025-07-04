import { useEffect, useRef } from "react";
import Background from "./Background";
import Tiles from "./Tiles";

import type { Game } from "../game/game";
import { move } from "../game/game";
import { randInt, shuffledArray } from "../utils/utils";

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
      console.log("key", e.key, "repeat", e.repeat);
      const acceptedKeys = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]
      if (acceptedKeys.includes(e.key) && !limitInput.current) {
        console.log("In useEffect - scheduling move")
        const val = randInt(1, 3) * 2;
        const preferredOrder = shuffledArray(16);
        changeGameState((prev) => move(e.key, prev, val, preferredOrder));
        }
      }

    window.addEventListener("keydown", handleUserInput);
    return () => window.removeEventListener("keydown", handleUserInput);
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
