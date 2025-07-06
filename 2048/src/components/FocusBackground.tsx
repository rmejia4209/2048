import { useState, useEffect } from "react";
import { useFocusBackground } from "./context/FocusBackground";


function FocusBackground(): React.JSX.Element {

  const {inFocus, setInFocus} = useFocusBackground();
  const [isBehind, setIsBehind] = useState(true);
  const animationDuration = 700 //ms. // figure out later

  useEffect(() => {
    if (inFocus) {
      window.dispatchEvent(new CustomEvent("pause-inputs", { detail: true }));
      setIsBehind(false);
      return;
    } else {
      window.dispatchEvent(new CustomEvent("pause-inputs", { detail: false }));
      const timeOutId = setTimeout(() => setIsBehind(true), animationDuration);
      return () => {clearTimeout(timeOutId)}
    }
  }, [inFocus])


  return (
    <div
      className={`
        fixed top-0 bottom-0 left-0 right-0 ${isBehind ? "-z-10" : "z-10"}
      `}
    >
      <div
        onClick={() => setInFocus(false)}
        className={`
          bg-black w-full h-full transition-opacity ease-in-out
          duration-700 
          ${
            inFocus
            ? "opacity-70 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
          
        `}
      >
      </div>
    </div>
  );
}

export default FocusBackground;