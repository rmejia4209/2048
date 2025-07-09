
import { createContext, useContext, useEffect, useState, useRef } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Game } from "@/game/types";
import { initGame, move } from "@/game/game";
import { shuffledArray } from "@/utils/utils";

type GameContext = {
  bestScore: number;
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>;
  limitInput: React.RefObject<boolean>;
  attemptMove: (direction: string) => void;
  tileSet: Set<number>;
  addToTileSet: (id: number) => void;
  emptyTileSet: () => void;
  tileFocus: boolean;
  setTileFocus: React.Dispatch<React.SetStateAction<boolean>>
  removeFromTileSet: (id: number) => void;
}

const GameContext = createContext<GameContext | null>(null);

// reset function defined here

export function GameContextProvider(
  { children }: { children: React.ReactNode}
): React.JSX.Element {

  const randomTileAssignmentOrder = shuffledArray(16)
  const [gameState, changeGameState] = useLocalStorage("currentGame",
    () => initGame(randomTileAssignmentOrder)
  );
  const [bestScore, setBestScore] = useLocalStorage("best", 0);
  const [tileSet, setTileSet] = useState<Set<number>>(new Set());
  const [tileFocus, setTileFocus] = useState(false);
  const limitInput = useRef(false);

  const addToTileSet = (id: number) => {
    setTileSet(prev => new Set(prev).add(id))
  }

  const removeFromTileSet = (id: number) => {
    setTileSet(prev => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    })
  }

  const emptyTileSet = () => setTileSet(new Set());

  const attemptMove = (direction: string) => {
    const val = Math.random() > 0.9 ? 4 : 2;
    const preferredOrder = shuffledArray(16);
    changeGameState((prev) => move(direction, prev, val, preferredOrder));
  }

  const context = {
    gameState,
    changeGameState,
    limitInput,
    attemptMove,
    bestScore,
    tileSet,
    addToTileSet,
    emptyTileSet,
    removeFromTileSet,
    tileFocus,
    setTileFocus,
  }

  // Add event listeners for arrow keys & focus limiter signal
  useEffect(() => {
    const handleUserInput = (e: KeyboardEvent) => {
      const acceptedKeys = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]
      if (acceptedKeys.includes(e.key) && !limitInput.current) {
        attemptMove(e.key)
      }
    }
    
    const pauseInput = (e: Event) => {
      limitInput.current = (e as CustomEvent).detail;
    }

    window.addEventListener("keydown", handleUserInput);
    window.addEventListener("pause-inputs", pauseInput);
    return () => {
      window.removeEventListener("keydown", handleUserInput);
      window.removeEventListener("pause-inputs", pauseInput);
    }
  }, [])

  // Limit input for a moment after a successful move
  useEffect(() => {
    limitInput.current = true;
    if (gameState.at(-1)!.isGameOver) return;
    const timeOutId = setTimeout(() => (limitInput.current = false), 150);
    return () => clearTimeout(timeOutId);
  }, [gameState])


  useEffect(() => {
    const score = gameState.at(-1)!.score;
    if (score > bestScore) setBestScore(score);
  }, [gameState])

  return (
    <GameContext.Provider value={ context }>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(
      "useGameContext must be used inside of GameContextProvider"
    );
  }
  return context;
}