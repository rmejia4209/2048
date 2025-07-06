import PowerUP from "../base/PowerUp";
import SwapIcon from "@/components/icons/SwapIcon";

import { useGameContext } from "../context/GameContext";




function SwapButton(): React.JSX.Element {

  //const { gameState, changeGameState } = useGameContext();
  //const numUndos = gameState[gameState.length - 1].powerups.undos

  return (
    <PowerUP
      Icon={SwapIcon}
      uses={2}
      focusable={true}
    />
  )
}


export default SwapButton;