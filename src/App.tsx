

import { GameContextProvider } from "@/components/context/GameContext";
import { FocusProvider } from "./components/context/FocusContext";
import GameHeader from "./components/GameHeader";
import GameContainer from './components/Game'
import GameFooter from "./components/GameFooter";



// TODO - accessiblity features

function App(): React.JSX.Element {
  
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <GameContextProvider>
        <FocusProvider>
          <GameHeader/>
          <GameContainer/>
          <GameFooter/>
        </FocusProvider>
      </GameContextProvider>
    </div>
  )
}

export default App
