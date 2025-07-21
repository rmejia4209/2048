import PowerUpContainer from "@/components/containers/PowerUpContainer"
import GameOverFooter from "@/components/containers/GameOverFooter";
import AIPlayer from "@/components/containers/AIMode";


function GameFooter(): React.JSX.Element {

  return (
    <>
      <PowerUpContainer/>
      <GameOverFooter/>
      <AIPlayer/>
    </>
  )
}

export default GameFooter;