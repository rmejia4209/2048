import { createPortal } from "react-dom";

import PowerUP from "@/components/base/PowerUp";
import RestartIcon from "@/components/icons/RestartIcon";
import Button from "@/components/base/Button";

import { useFocusBackground } from "@/components/context/FocusBackground";


function Modal({ resetGame }: { resetGame : () => void; }): React.JSX.Element {

  const { inFocus, setInFocus } = useFocusBackground()

  return createPortal(
    <div
      className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-neutral-800 rounded-2xl w-88 xs:w-112 h-fit flex flex-col gap-6
        text-center p-6 overflow-x-auto transition-all duration-700 ease-in-out
        ${inFocus ? "opacity-100 scale-100 z-20" : "opacity-0 scale-90 -z-20"}
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
            setInFocus(false);
          }}
        />
        <Button txt={"Cancel"} onClick={() => setInFocus(false)}/>
      </div>
    </div>, document.body
  );
}


function RestartGameButton(
  { resetGame }: {resetGame : () => void;}
):React.JSX.Element {
    const { setInFocus } = useFocusBackground()

  return (
    <>
    <PowerUP
      Icon={RestartIcon}
      uses={Infinity}
      buttonType="destructive"
      action={() => {setInFocus(true)}}
    />
    <Modal resetGame={resetGame}/>
    </>
  )
}

export default RestartGameButton;