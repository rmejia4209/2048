

import { useEffect, useState, useRef } from "react";


interface TilePropsTypes {
  row: number;
  col: number;
  value: number;
}

function Tile({ row, col, value }: TilePropsTypes): React.JSX.Element {

  const [isAnimating, setIsAnimating] = useState(false);
  const animationDuration = 150;  // ms
  const prev = useRef(0)
    const determineColor = (value: number) => {
      switch (value) {
        case 2:
          return "text-5xl text-stone-500 bg-orange-50"
        case 4:
          return "text-5xl text-stone-500 bg-orange-100"
        case 8:
          return "text-5xl text-stone-100 bg-orange-300";
        case 16:
          return "text-5xl text-stone-100 bg-orange-400"
        case 32:
          return "text-5xl text-stone-100 bg-red-400"
        case 64:
          return "text-5xl text-stone-100 bg-red-600"
        case 128:
          return "text-4xl text-stone-100 bg-amber-300"
        case 256:
          return "text-4xl text-stone-100 bg-amber-500"
        case 512:
          return "text-4xl text-stone-100 bg-red-800"
        case 1024:
          return "text-3xl text-stone-100 bg-rose-500"
        case 2048:
          return "text-3xl text-stone-100 bg-fuchsia-600"
        case 4096:
          return "text-3xl text-stone-100 bg-zinc-950"
        case 8192:
          return "text-3xl text-stone-100 bg-indigo-800"
        case 16384:
          return "text-2xl text-stone-100 bg-blue-500"
        case 32768:
          return "text-2xl text-stone-100 bg-sky-500"
        case 65536:
          return "text-2xl text-stone-100 bg-cyan-500"
        case 131072:
          return "text-xl text-stone-100 bg-emerald-700"
        default:
          return null;
      }
    }


  useEffect(() => {
    if (value === prev.current) return;
    else if (prev.current === 0) {

      const startAnimation = setTimeout(() => {
        setIsAnimating(true)
      }, animationDuration)
      const stopAnimation = setTimeout(() => {
        prev.current = value;
        setIsAnimating(false);
      }, animationDuration * 2)
      return () => {
        clearInterval(startAnimation);
        clearInterval(stopAnimation);
      }
    }

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
        absolute top-${4*(7*row+1)} left-${4*(7*col+1)} size-24 rounded-sm
        transition-all duration-${animationDuration} ease-in-out
        ${isAnimating && value > 0
          ? "scale-125"
          : (prev.current === 0 ? "scale-0" : "scale-100")
        }
        ${determineColor(value)}
         font-bold text-center leading-24
      `}
    >
      {value ? value : ""}
    </div>
  )
}

export default Tile;