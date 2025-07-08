
import Tile from "./Tile"
import type { Game } from "../game/types";

function Tiles({ gameState }: {gameState: Game}) {

  const sortById = <T extends {id: number}>(a: T, b: T): number => {
    return a.id - b.id
  };

  return (
    <div>
      {gameState[gameState.length - 1].board.flat().sort(sortById).map(
        (tile) => (
          <Tile
            id={tile.id}
            key={tile.id}
            row={tile.row}
            col={tile.col}
            value={tile.value}
          />
        )
      )}
    </div>
  )
}

export default Tiles;