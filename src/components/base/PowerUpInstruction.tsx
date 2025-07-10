import { useEffect, useState } from "react";
import BodyPortal from "./BodyPortal";
import Button from "./Button";


interface PropTypes {
  isActive: boolean
  power: string;
  instructions: string;
  unFocus: () => void;
}

function PowerUpInstruction(props: PropTypes) {

  const { isActive, power, instructions, unFocus } = props
  const [isBehind, setIsBehind] = useState(true);
    
  // Delay reducing the Z index when leaving focus
  useEffect(() => {
    if (isActive) setIsBehind(false);
    else {
      const timeOutId = setTimeout(() => setIsBehind(true), 300);
      return () => {clearTimeout(timeOutId)}    
    }
  }, [isActive])


  return (
    <BodyPortal>
      <div
        className={`
          fixed bg-neutral-500 rounded-2xl px-4 py-3 text-sm text-stone-100
          top-4 xs:top-10 w-88 xs:w-124 left-1/2 -translate-x-1/2
          transition-opacity duration-300
          ${isActive ? " opacity-100": "-z-10 opacity-0 pointer-events-none"}
          ${ isBehind ? "-z-10" : "z-10"}
          items-center
          gap-2 justify-self-center text-pretty

        `}
      > 
        <div className="flex flex-row justify-between">
          <div className="flex flex-col items-start">
            <h3 className="font-semibold uppercase mb-0">
              {power}
            </h3>
            <p>
              {instructions}
            </p>
          </div>
          <Button txt="Cancel" onClick={unFocus}/>
        </div>
      </div>
    </BodyPortal>
  )
}

export default PowerUpInstruction