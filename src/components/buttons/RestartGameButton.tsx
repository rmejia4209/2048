import { useState } from "react";

import Button from "../base/Button";
import Modal from "@/components/base/Modal";
import { useGameContext } from "../context/GameContext";



interface ResetGameModalPropTypes {
isOpen: boolean;
setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
resetGame : () => void;
}

function ResetGameModal(
  { isOpen, setIsOpen, resetGame }: ResetGameModalPropTypes
): React.JSX.Element {

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">New Game</h1>
        <div className="text-sm xs:text-md">
          <p>Are you sure you want to start a new game?</p>
          <p>All progress will be lost?</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          txt={"Start New Game"}
          type="destructive"
          onClick={()=>{
            resetGame();
            setIsOpen(false);
          }}
        />
        <Button txt={"Cancel"} onClick={() => setIsOpen(false)}/>
        </div>
    </Modal>
  )
}



function RestartGameButton():React.JSX.Element {

  const [isActive, setIsActive] = useState(false);
  const { resetGame, gameState } = useGameContext();

  
  return (
    <>
      <Button
        txt="New Game"
        onClick={() => setIsActive(true)}
        isDisabled={gameState.at(-1)!.isGameOver}
      />
      <ResetGameModal
        isOpen={isActive}
        setIsOpen={setIsActive}
        resetGame={resetGame}
      />
    </>
  )
}

export default RestartGameButton;