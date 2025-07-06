import { useState } from "react";
import CancelIcon from "../icons/CancelIcon";

function Uses({ numOfUses }: { numOfUses: number;}): React.JSX.Element {
  return (
    <div className="flex flex-row gap-1">
      {Array.from({length: 2}, (_, idx) => {
        return (
          <div key={idx} className={`
            w-4 h-1 rounded-4xl
            ${numOfUses > idx ? "bg-pink-300": "bg-neutral-300"}
          `}></div>
        )
      })}
    </div>
  )
}



type BaseProps = {
  Icon: React.FC;
  uses: number;
  buttonType?: string;
}

type ActionOnly = {
  focusable?: false;
  action: () => void;
}

type FocusableOnly = {
  focusable: true;
  action?: undefined
}

type PowerUpProps = BaseProps & (ActionOnly | FocusableOnly)

function PowerUp(props: PowerUpProps): React.JSX.Element {

  const {Icon, uses, buttonType } = props
  const [isActive, setIsActive] = useState(false);

  const actionWrapper = () => {
    if ("focusable" in props && props.focusable) {
      setIsActive(true);
    } else {
      props.action();
    }
  }

  const calcColorWay = () => {
    switch(buttonType) {
      case "destructive":
        return "bg-red-800 hover:bg-red-900 focus:bg-red-900"
      default:
        return (`
          hover:bg-neutral-700 focus-visible:bg-neutral-700
          ${isActive ? "bg-neutral-700" : ""}
          ${
            uses === 0
            ? "bg-neutral-700 opacity-40 cursor-not-allowed"
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
        disabled={uses === 0 ? true : false}
        className={`
          flex items-center justify-center size-12 xs:size-12 xl:size-14 
          rounded-xl shadow-md shadow-black/30 transform transition-all
          duration-150 ease-in-out focus:outline-none ${calcColorWay()} 
          ${isActive ? "-translate-y-7" : ""}
        `}
        onClick={actionWrapper}
      >
        <Icon/>
      </button>
      {uses === Infinity ? null : <Uses numOfUses={uses}/>}
    </div>
    {
      "focusable" in props && props.focusable
      ? (    
        <button
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 transition-all
            ease-in-out duration-150 active:scale-90
            ${isActive ? "opacity-80 z-10" : "opacity-0 -z-10"}
          `}
          onClick={() => setIsActive(false)}
          >
            <CancelIcon/>
        </button>
      )
      : null
    }

    </div>

  );
}

export default PowerUp;