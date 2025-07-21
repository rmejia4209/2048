import { useState, useEffect } from "react";
import BodyPortal from "@/components/base/BodyPortal"


// Generic backdrop
interface BackdropProps {
  inFocus: boolean;
  closeAction?: () => void;
  children?: React.ReactNode
}

export default function Backdrop(
  { children, inFocus, closeAction }: BackdropProps
): React.JSX.Element {

  const [isBehind, setIsBehind] = useState(true);
  
  // Delay reducing the Z index when leaving focus
  useEffect(() => {
    if (inFocus) setIsBehind(false);
    else {
      const timeOutId = setTimeout(() => setIsBehind(true), 300);
      return () => {clearTimeout(timeOutId)}  
    }
  }, [inFocus])

  
  return (
    <BodyPortal>
      <div
        className={`
          fixed top-0 bottom-0 left-0 right-0 ${isBehind ? "-z-10" : "z-10"}
          `}
        >
        <div
          className={`
            bg-black w-full h-full transition-opacity ease-in-out duration-300
            ${inFocus ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
          onClick={closeAction}
        >
        </div>
        {children}
      </div>
    </BodyPortal>
  )
}