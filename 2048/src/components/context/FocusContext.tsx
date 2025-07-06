
import { createContext, useContext, useState, useEffect } from "react";


type FocusContextType = {
  inFocus: boolean;
  setInFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const FocusContext = createContext<null | FocusContextType>(null);

export function FocusProvider(
  { children }: { children: React.ReactNode }
): React.JSX.Element {
  
  const [inFocus, setInFocus] = useState(false);

  useEffect(() => {
    if (inFocus) {
      console.log("firing")
      window.dispatchEvent(new CustomEvent("pause-inputs", { detail: true }));
    } else {
      window.dispatchEvent(new CustomEvent("pause-inputs", { detail: false }));
    }
    return;
  }, [inFocus])
  
  return (
    <FocusContext.Provider value={{ inFocus, setInFocus }}>
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error(
      "useFocus must be used inside of FocusProvider"
    );
  }
  return context;
}