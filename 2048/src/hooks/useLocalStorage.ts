import { useState, useEffect } from "react";


function loadFromStorage<T>(key: string): T | undefined {
  const savedVal = localStorage.getItem(key);
  if (!savedVal) return undefined
  try {
    return JSON.parse(savedVal) as T;  
  } catch (e) {
    console.warn(`Failed to parse local storage key ${key}`, e);
    localStorage.removeItem(key);
    return undefined
  }

}

function useLocalStorage<T>(
  key: string,
  defaultVal: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  
  const [val, setVal] = useState<T>(() => {
    const data = loadFromStorage<T>(key);
    if (data !== undefined) return data;
    if (typeof defaultVal === "function") return (defaultVal as () => T)();
    return defaultVal;
  })

  // Load data from local storage on render
  useEffect(() => {
    const data = loadFromStorage<T>(key);
    if (data !== undefined) setVal(data);    
  }, []);

  // Save whenever val changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val))
  }, [val]);

  return [val, setVal]

}


export default useLocalStorage;