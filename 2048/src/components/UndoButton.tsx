
import PowerUP from "./base/PowerUp";
import UndoIcon from "./icons/UndoIcon";

import type { Game } from "../game/types";
import { undoMove } from "../game/game";


interface UndoButtonPropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>
}

function UndoButton(
  { gameState, changeGameState }: UndoButtonPropTypes
): React.JSX.Element {

  const numUndos = gameState[gameState.length - 1].powerups.undos

  return (
    <PowerUP
      Icon={UndoIcon}
      uses={numUndos}
      action={() => {changeGameState((prev) => undoMove(prev))}}
    />
  )
}


export default UndoButton;