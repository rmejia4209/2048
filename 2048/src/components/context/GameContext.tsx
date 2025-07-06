
import { createContext, useContext } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Game } from "@/game/types";
import { initGame } from "@/game/game";
import { shuffledArray } from "@/utils/utils";

type GameContext = {
  gameState: Game;
  changeGameState: React.Dispatch<React.SetStateAction<Game>>;
}

const GameContext = createContext<GameContext | null>(null);

export function GameContextProvider(
  { children }: { children: React.ReactNode}
): React.JSX.Element {

  const randomTileAssignmentOrder = shuffledArray(16)
  const [gameState, changeGameState] = useLocalStorage("currentGame",
    () => initGame(randomTileAssignmentOrder)
  )

  return (
    <GameContext.Provider value={{ gameState, changeGameState }}>
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