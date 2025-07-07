import { useEffect, useState } from "react";
import { useFocus } from "../context/FocusContext";

import Uses from "@/components/base/Uses";
import CancelIcon from "../icons/CancelIcon";
import { useGameContext } from "../context/GameContext";


type PropTypes = {
  Icon: React.FC;
  uses: number;
  buttonType?: string;
  focusable?: boolean;
  action: () => void;
}

function CancelButton(
  { isActive, action }: { isActive: boolean; action: () => void; }
): React.JSX.Element 
{
  return (
    <button
      className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 transition-all ease-in-out
        duration-150 active:scale-90
        ${isActive ? "opacity-80 z-30" : "opacity-0 -z-10"}
      `}
      onClick={action}
      >
        <CancelIcon/>
    </button>

  )
}

function PowerUp(props: PropTypes): React.JSX.Element {

  const {Icon, uses, buttonType, focusable, action } = props
  const [isActive, setIsActive] = useState(false);
  const { inFocus, setInFocus } = useFocus()
  const { tileFocus } = useGameContext()

  const actionWrapper = () => {
    if (isActive) return;
    if (focusable) {
      setIsActive(true);
      setInFocus(true);
    }
      action();
  }

  const unFocus = () => {
    setInFocus(false);
    setIsActive(false);
    action();
  }

  useEffect(() => {
    if (!tileFocus) {
      setInFocus(false);
      setIsActive(false);
    }
  }, [tileFocus])

  const isDisabled = (uses === 0) || (inFocus && !isActive)


  const calcColorWay = () => {
    switch(buttonType) {
      case "destructive":
        return (`
          hover:bg-red-900 focus-visiible:bg-red-900 active:scale-95
          ${
            isDisabled
            ? "bg-red-900 opacity-40"
            : "bg-red-800 hover:cursor-pointer "
          }

        `)
      default:
        return (`
          hover:bg-neutral-700 focus-visible:bg-neutral-700
          ${isActive ? "bg-neutral-700" : ""}
          ${
            isDisabled
            ? "bg-neutral-700 opacity-40"
            : "bg-neutral-600 hover:cursor-pointer active:scale-95"
          }
        `)
    }
  }


  return (
    <div className="relative">
      <div className="flex flex-col items-center w-max mx-auto gap-1.5">
      <button
        aria-label="Undo"
        disabled={isDisabled}
        className={`
          flex items-center justify-center size-12 xs:size-12 xl:size-14 
          rounded-xl shadow-md shadow-black/30 transform transition-all
          duration-300 ease-in-out focus:outline-none ${calcColorWay()} 
          ${isActive ? "-translate-y-7 z-30" : ""}
        `}
        onClick={actionWrapper}
      >
        <Icon/>
      </button>
      {uses === Infinity ? null : <Uses numOfUses={uses}/>}
    </div>
    {
      "focusable" in props && props.focusable
      ? <CancelButton isActive={isActive} action={unFocus}/>
      : null
    }
    </div>

  );
}

export default PowerUp;