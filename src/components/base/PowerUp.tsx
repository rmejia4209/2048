import { useEffect, useState } from "react";
import { useFocus } from "@/components/context/FocusContext";

import CancelButton from "@/components/base/CancelButton";
import ToolTip from "@/components/base/ToolTip";
import Uses from "@/components/base/Uses";

import { useGameContext } from "../context/GameContext";


type PropTypes = {
  Icon: React.FC;
  power: string;
  uses: number;
  unlockVal?: number;
  buttonType?: string;
  focusable?: boolean;
  action: () => void;
}



function PowerUp(props: PropTypes): React.JSX.Element {

  const {Icon, power, uses, unlockVal, buttonType, focusable, action } = props
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
    <div data-active={isActive} className="group relative">
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
    <ToolTip
      power={power}
      uses={uses}
      unlockVal={unlockVal}
      destructive={buttonType === "destructive" ? true : false}
    />
    </div>

  );
}

export default PowerUp;