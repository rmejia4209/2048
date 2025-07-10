import { useState } from "react";

import PowerUP from "../base/PowerUp";
import SwapIcon from "@/components/icons/SwapIcon";

import { useGameContext } from "../context/GameContext";
import { useEffect } from "react";

import { swapTilesPowerUp } from "@/game/game";



function SwapButton(): React.JSX.Element {

  const { 
    gameState, changeGameState, tileSet, setTileFocus, emptyTileSet 
  } = useGameContext();
  const [instructions, setInstructions] = useState("Select the first tile")

  useEffect(() => {
    if (tileSet.size === 1) {
      setInstructions("Select the second tile");
    } else if (tileSet.size === 2) {
      let timeOutSwap: number;
      let timeOutTileFocus: number;
      let timeOutEmptySet: number;
      setInstructions("Select the first tile");
      timeOutTileFocus = setTimeout(() => setTileFocus(false), 150);
      timeOutSwap = setTimeout(() => {
        const [id_1, id_2] = [...tileSet]
        changeGameState((prev) => swapTilesPowerUp(id_1, id_2, prev))
      }, 150)
      timeOutEmptySet = setTimeout(() => emptyTileSet(), 200)
      return () => {
        clearTimeout(timeOutSwap);
        clearTimeout(timeOutTileFocus);
        clearTimeout(timeOutEmptySet);
      }
    } else setInstructions("Select the first tile");
  }, [tileSet])
  

  const numUndos = gameState[gameState.length - 1].powerups.swaps

  return (
    <PowerUP
      Icon={SwapIcon}
      power="Swap two tiles"
      instructions={instructions}
      uses={numUndos}
      unlockVal={256}
      focusable={true}
      action={() => setTileFocus((prev) => (!prev))}
    />
  )
}


export default SwapButton;