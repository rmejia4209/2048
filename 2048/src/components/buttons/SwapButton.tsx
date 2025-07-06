import PowerUP from "../base/PowerUp";
import SwapIcon from "@/components/icons/SwapIcon";

import type { Game } from "../../game/types";


interface UndoButtonPropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>
}

function SwapButton(
  { gameState, changeGameState }: UndoButtonPropTypes
): React.JSX.Element {

  const numUndos = gameState[gameState.length - 1].powerups.undos

  return (
    <PowerUP
      Icon={SwapIcon}
      uses={2}
      focusable={true}
    />
  )
}


export default SwapButton;