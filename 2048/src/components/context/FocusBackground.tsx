
import { createContext, useContext, useState } from "react";


type FocusContextType = {
  inFocus: boolean;
  setInFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const FocusBackgroundContext = createContext<null | FocusContextType>(null);

export function FocusBackgroundProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  
  const [inFocus, setInFocus] = useState(false);
  
  return (
    <FocusBackgroundContext.Provider value={{ inFocus, setInFocus }}>
      {children}
    </FocusBackgroundContext.Provider>
  );
}

export function useFocusBackground() {
  const context = useContext(FocusBackgroundContext);
  if (!context) {
    throw new Error(
      "useFocusBackground must be used inside of FocusBackgroundProvider"
    );
  }
  return context;
}