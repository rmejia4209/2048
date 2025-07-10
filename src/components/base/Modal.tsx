import { useState, useEffect } from "react";

import BodyPortal from "@/components/base/BodyPortal";


interface BackdropProps {
  inFocus: boolean;
  children?: React.ReactNode

}

function Backdrop(
  { children, inFocus }: BackdropProps
): React.JSX.Element {

  const [isBehind, setIsBehind] = useState(true);
  
  // Delay reducing the Z index when leaving focus
  useEffect(() => {
    if (inFocus) setIsBehind(false);
    else {
      const timeOutId = setTimeout(() => setIsBehind(true), 700);
      return () => {clearTimeout(timeOutId)}    
    }
  }, [inFocus])

  
  return (
    <BodyPortal>
      <div className={`fixed top-0 bottom-0 left-0 right-0 ${isBehind ? "-z-10" : "z-10"}`}>
        <div
          className={`
            bg-black w-full h-full transition-opacity ease-in-out duration-700
            ${inFocus ? "opacity-70 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
        >
        </div>
        {children}
      </div>
    </BodyPortal>
  )
}


interface ModalPropTypes {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export default function Modal(
  { isOpen, children}: ModalPropTypes
): React.JSX.Element {

  return (
    <Backdrop inFocus={isOpen} >
      <dialog
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md shadow-black/30
          bg-neutral-800 z-20 rounded-2xl w-88 xs:w-112 h-fit flex flex-col gap-6 text-center p-6 overflow-x-auto
          transition-all duration-700 ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
      >
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </dialog>
    </Backdrop>
  )
}