

import { useEffect, useState, useRef } from "react";


interface TilePropsTypes {
  row: number;
  col: number;
  value: number;
}

function Tile({ row, col, value }: TilePropsTypes): React.JSX.Element {

  const [isAnimating, setIsAnimating] = useState(false);
  const animationDuration = 100;  // ms
  const prev = useRef(0)
  const determineColor = (value: number) => {
    switch (value) {
      case 2:
        return "text-4xl xs:text-5xl xl:text-5xl text-stone-500 bg-orange-50"
      case 4:
        return "text-4xl xs:text-5xl xl:text-5xl text-stone-500 bg-orange-100"
      case 8:
        return "text-4xl xs:text-5xl xl:text-5xl text-stone-100 bg-orange-300";
      case 16:
        return "text-4xl xs:text-5xl xl:text-5xl text-stone-100 bg-orange-400"
      case 32:
        return "text-4xl xs:text-5xl xl:text-5xl text-stone-100 bg-red-400"
      case 64:
        return "text-4xl xs:text-5xl  xl:text-5xl text-stone-100 bg-red-600"
      case 128:
        return "text-3xl xs:text-3xl xl:text-5xl text-stone-100 bg-amber-300"
      case 256:
        return "text-3xl xs:text-3xl xl:text-5xl text-stone-100 bg-amber-500"
      case 512:
        return "text-3xl xs:text-3xl xl:text-5xl text-stone-100 bg-red-800"
      case 1024:
        return "text-2xl xs:text-3xl xl:text-4xl text-stone-100 bg-rose-500"
      case 2048:
        return "text-2xl xs:text-3xl xl:text-4xl text-stone-100 bg-fuchsia-600"
      case 4096:
        return "text-2xl xs:text-3xl xl:text-4xl text-stone-100 bg-zinc-950"
      case 8192:
        return "text-2xl xs:text-3xl xl:text-4xl text-stone-100 bg-indigo-800"
      case 16384:
        return "text-xl xs:text-2xl xl:text-3xl text-stone-100 bg-blue-500"
      case 32768:
        return "text-xl xs:text-2xl xl:text-3xl text-stone-100 bg-sky-500"
      case 65536:
        return "text-xl xs:text-2xl xl:text-3xl text-stone-100 bg-cyan-500"
      case 131072:
        return "text-xl xs:text-2xl xl:text-3xl text-stone-100 bg-emerald-700"
      default:
        return null;
      }
    }


  useEffect(() => {
    if (value === prev.current) return;

    // Scale tile from 0% to 100% after a 150ms delay
    else if (prev.current === 0) {
      const startAnimation = setTimeout(() => {
        setIsAnimating(true)
      }, animationDuration * 2)
      const stopAnimation = setTimeout(() => {
        prev.current = value;
        setIsAnimating(false);
      }, animationDuration * 3)
      return () => {
        clearInterval(startAnimation);
        clearInterval(stopAnimation);
      }
    }

    // Scale tile to 125% for 150ms
    else {
      setIsAnimating(true);
      const stopAnimation = setTimeout(() => {
        prev.current = value;
        setIsAnimating(false);
      }, animationDuration)
      return () => clearInterval(stopAnimation)
    }

  }, [value])

  return (
    <div
      className={`
        absolute top-${22*row+2} left-${22*col+2} xs:top-${26*row+2} xs:left-${26*col+2} xl:top-${34*row+4} xl:left-${34*col+4}
        size-20 xs:size-24 xl:size-30 rounded-2xl
        transition-all duration-${animationDuration} ease-in-out
        ${isAnimating && value > 0
          ? "scale-125"
          : (prev.current === 0 ? "scale-0" : "scale-100")
        }
        ${determineColor(value)}
         font-bold text-center leading-20 xs:leading-24 xl:leading-30
      `}
    >
      {value ? value : ""}
    </div>
  )
}

export default Tile;