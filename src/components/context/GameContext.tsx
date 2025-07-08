
import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Game } from "@/game/types";
import { initGame } from "@/game/game";
import { shuffledArray } from "@/utils/utils";

type GameContext = {
  bestScore: number;
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>;
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

  const emptyTileSet = () => {
    setTileSet(new Set());
  }

  const context = {
    gameState,
    changeGameState,
    bestScore,
    tileSet,
    addToTileSet,
    emptyTileSet,
    removeFromTileSet,
    tileFocus,
    setTileFocus,
    
  }

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