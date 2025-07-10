

import { GameContextProvider } from "@/components/context/GameContext";
import { FocusProvider } from "@/components/context/FocusContext";
import Credits from "@/components/Credits";
import Header from "@/components/Header";



// TODO - accessiblity features

function Layout(
  { children }: { children: React.ReactNode }
): React.JSX.Element {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow flex flex-col justify-center">
        <GameContextProvider>
          <FocusProvider>
            {children}
          </FocusProvider>
        </GameContextProvider>
      </main>
      <Credits/>
    </div>
  )
}

export default Layout
