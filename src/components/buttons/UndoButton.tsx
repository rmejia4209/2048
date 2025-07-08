
import PowerUP from "../base/PowerUp";
import UndoIcon from "../icons/UndoIcon";

import { undoMove } from "../../game/game";
import { useGameContext } from "../context/GameContext";




function UndoButton(): React.JSX.Element {

  const { gameState, changeGameState } = useGameContext();
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