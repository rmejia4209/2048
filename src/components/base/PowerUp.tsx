import { useEffect, useState } from "react";

import CancelButton from "@/components/base/CancelButton";
import ToolTip from "@/components/base/ToolTip";
import Uses from "@/components/base/Uses";

import { useGameContext } from "../context/GameContext";
import PowerUpInstruction from "@/components/base/PowerUpInstruction";

// TODO remove destructive type...

interface PowerUpButtonPropTypes {
  Icon: React.FC;
  uses: number;
  isActive: boolean;
  action: () => void;
}


function PowerUpButton(props: PowerUpButtonPropTypes): React.JSX.Element {
  
  const { Icon, uses, isActive, action } = props
  const { tileFocus } = useGameContext()

  const isDisabled = (uses === 0) || (tileFocus && !isActive)

  return (
    <div className="flex flex-col items-center w-max mx-auto gap-1.5">
      <button
        aria-label="Undo"
        disabled={isDisabled}
        className={`
          flex items-center justify-center size-12 xs:size-12 xl:size-14 
          rounded-xl shadow-md shadow-black/30 transform transition-all
          duration-300 ease-in-out focus:outline-none
          hover:bg-neutral-700 focus-visible:bg-neutral-700
          ${isActive ? "bg-neutral-700 -translate-y-7 z-30" : ""}
          ${
            isDisabled
            ? "bg-neutral-700 opacity-40"
            : "bg-neutral-600 hover:cursor-pointer active:scale-95"
          }
        `}
        onClick={action}
      >
        <Icon/>
      </button>
      {uses === Infinity ? null : <Uses numOfUses={uses}/>}
    </div>

  )
}


type PowerUpPropTypes = {
  Icon: React.FC;
  power: string;
  uses: number;
  unlockVal: number;
  instructions?: string
  focusable?: boolean;
  action: () => void;
}


function PowerUp(props: PowerUpPropTypes): React.JSX.Element {

  const {Icon, uses, power, instructions, focusable, action } = props
  const [isActive, setIsActive] = useState(false);
  const { tileFocus } = useGameContext()
  
  /**
   * isActive tranlates the button up & is actived onClick for focusable
   * buttons
   * 
   * tileFocus will disable inActive buttons until it is set false
   *  */
  
  const actionWrapper = () => {
    if (isActive) return;
    if (focusable) setIsActive(true);
    action();
  }

  const unFocus = () => {
    setIsActive(false);
    action();
  }

  // Escape focus if tileFocus is removed (by completing powerup)
  useEffect(() => {
    if (!tileFocus) setIsActive(false);
  }, [tileFocus])


  return (
    <div data-active={isActive || tileFocus} className="group relative">
      <PowerUpButton 
        Icon={Icon}
        uses={uses}
        isActive={isActive}
        action={actionWrapper}
      />
      {
        "focusable" in props && props.focusable
        ? <CancelButton isActive={isActive} action={unFocus}/>
        : null
      }
      <ToolTip
          power={props.power}
          uses={props.uses}
          unlockVal={props.unlockVal}
        />
    {
      focusable && (
        <PowerUpInstruction
          isActive={isActive}
          power={power}
          instructions={instructions!}
          unFocus={unFocus}
        />
      )
    }
    </div>

  );
}

export default PowerUp;