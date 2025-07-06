import { createPortal } from "react-dom";

import PowerUP from "@/components/base/PowerUp";
import RestartIcon from "@/components/icons/RestartIcon";
import Button from "@/components/base/Button";

import { useFocusBackground } from "@/components/context/FocusBackground";
import { useState } from "react";


type ModalPropTypes = {
  isActive: boolean;
  toggleModalOff: () => void;
  confirmReset: () => void;
}

function Modal(props: ModalPropTypes): React.JSX.Element {

  const { isActive, toggleModalOff, confirmReset } = props

  return createPortal(
    <div
      className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-neutral-800 rounded-2xl w-88 xs:w-112 h-fit flex flex-col gap-6
        text-center p-6 overflow-x-auto transition-all duration-700 ease-in-out
        ${isActive ? "opacity-100 scale-100 z-20" : "opacity-0 scale-90 -z-20"}
      `}
    >
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
          onClick={confirmReset}
        />
        <Button txt={"Cancel"} onClick={toggleModalOff}/>
      </div>
    </div>, document.body
  );
}


function RestartGameButton(
  { resetGame }: {resetGame : () => void;}
):React.JSX.Element {

    const [isActive, setIsActive] = useState(false);
    const { setInFocus } = useFocusBackground()

    const toggleModalOn = () => {
      setIsActive(true);
      setInFocus(true);
    }

    const toggleModalOff = () => {
      setInFocus(false);
      setIsActive(false);
    }

    const confirmReset = () => {
      resetGame();
      setInFocus(false);
      setIsActive(false);
    }

  return (
    <>
      <PowerUP
        Icon={RestartIcon}
        uses={Infinity}
        buttonType="destructive"
        action={toggleModalOn}
      />
      <Modal
        toggleModalOff={toggleModalOff}
        isActive={isActive}
        confirmReset={confirmReset}
      />
    </>
  )
}

export default RestartGameButton;