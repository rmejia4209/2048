


import UndoButton from "./UndoButton";

import type { Game } from "../game/game";
import { deepCopy } from "../utils/utils";


interface PowerUpContainerPropTypes {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>
  //prevGameStates: React.RefObject<Game[]>
}

function PowerUpContainer(

  { gameState, changeGameState }: PowerUpContainerPropTypes
): React.JSX.Element {
  return (
    <div className={`
      flex flex-row justify-center gap-4 items-center mt-4 bg-neutral-500
      w-72 mx-auto xs:w-96 xl:w-136 rounded-2xl py-2
    `}>
      <UndoButton
        onClick={
          () => {
            if (gameState.length > 1) {
              changeGameState((prev) => {
                const nextState = deepCopy(prev);
                nextState.pop();
                return nextState;
              });
            }
          }
        }
      />
    </div>
  );
}

export default PowerUpContainer;