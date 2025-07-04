
import PowerUP from "./base/PowerUp";
import UndoIcon from "./icons/UndoIcon";

import type { Game } from "../game/game";
import { deepCopy } from "../utils/utils";


interface UndoButtonPropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>
}

function UndoButton(
  { gameState, changeGameState }: UndoButtonPropTypes
): React.JSX.Element {

  const numUndos = gameState[gameState.length - 1].powerups.undos
  const undo = () => {
    let numberUndos = gameState[gameState.length - 1].powerups.undos;
    if (gameState.length > 1 && numberUndos > 0) {
      changeGameState((prev) => {
        const nextState = deepCopy(prev);
        nextState.pop();
        nextState[nextState.length - 1].powerups.undos = (
          (numberUndos - 1) as 0 | 1
        );
        return nextState;
      });
    }
  }

  return <PowerUP Icon={UndoIcon} uses={numUndos} action={undo}/>
}


export default UndoButton;