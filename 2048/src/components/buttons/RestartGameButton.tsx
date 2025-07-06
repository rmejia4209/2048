
import { useState, useEffect } from "react";

import PowerUP from "../base/PowerUp";
import RestartIcon from "../icons/RestartIcon";
import Button from "../base/Button";
import { createPortal } from "react-dom";


interface ModalPropTypes {
isOpen: boolean;
setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
resetGame : () => void;
}

function Modal({ isOpen, setIsOpen, resetGame }: ModalPropTypes ): React.JSX.Element {

  const [isBehind, setIsBehind] = useState(true);
  const animationDuration = 700 //ms

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(
        new CustomEvent("pause-inputs", { detail: true })
      );
      setIsBehind(false);
    } else {
      window.dispatchEvent(
        new CustomEvent("pause-inputs", { detail: false })
      );
      const timeOutId = setTimeout(() => setIsBehind(true), animationDuration);
      return () => {clearTimeout(timeOutId)}
    }
    return;
  }, [isOpen])


  return createPortal(
    <div
      className={`
        fixed top-0 bottom-0 left-0 right-0 ${isBehind ? "-z-10" : "z-10"}
      `}
    >
      <div
        onClick={() => setIsOpen(false)}
        className={`
          bg-black w-full h-full transition-opacity ease-in-out
          duration-${animationDuration} 
          ${
            isOpen
            ? "opacity-70 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
          
        `}
      >
      </div>
      <div
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-neutral-800 z-20 rounded-2xl w-88 xs:w-112 h-fit flex flex-col gap-6 text-center p-6 overflow-x-auto
          transition-all duration-${animationDuration} ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}
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
            onClick={()=>{
              resetGame();
              setIsOpen(false);
            }}
          />
          <Button txt={"Cancel"} onClick={() => setIsOpen(false)}/>
        </div>
      </div>
    </div>, document.body
  );
}


function RestartGameButton(
  { resetGame }: {resetGame : () => void;}):React.JSX.Element {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
    <PowerUP
      Icon={RestartIcon}
      uses={Infinity}
      buttonType="destructive"
      action={() => setIsOpen(true)}
    />
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} resetGame={resetGame}/>
    </>
  )
}


export default RestartGameButton;