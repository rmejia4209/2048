

import { GameContextProvider } from "@/components/context/GameContext";
import { FocusProvider } from "@/components/context/FocusContext";
import Credits from "@/components/Credits";
import Header from "@/components/Header";



// TODO - accessibility features
// TODO - remove Focus provider
function Layout(
  { children }: { children: React.ReactNode }
): React.JSX.Element {
  
  return (
    <GameContextProvider>
      <FocusProvider>
        <div className="flex flex-col min-h-screen">
          <Header/>
            <main className="flex-grow flex flex-col justify-center">  
              {children}
            </main>
          <Credits/>
        </div>
      </FocusProvider>
    </GameContextProvider>
  )
}

export default Layout
