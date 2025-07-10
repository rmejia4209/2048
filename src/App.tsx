
import GameHeader from "./components/GameHeader";
import GameContainer from './components/Game'
import GameFooter from "./components/GameFooter";

import Layout from "./components/Layout";



// TODO - accessiblity features

export default function App(): React.JSX.Element {
  
  return (
    <Layout>
      <GameHeader/>
      <GameContainer/>
      <GameFooter/>
    </Layout>
  )
}

