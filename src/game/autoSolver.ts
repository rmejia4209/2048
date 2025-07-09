import { slide, merge, addTile } from "./game";
import { deepCopy, shuffledArray } from "@/utils/utils";
import type { Board } from "./types";



function bareMove(board: Board, direction: string): [boolean, number] {

    let numMoves = 0; 
    let score = 0;

    numMoves += slide(direction, board);
    score += merge(direction, board);
    numMoves += slide(direction, board);

    return [(numMoves + score) > 0, score]
}


type Direction = "left" | "right" | "up" | "down";
type MoveInfo = {
  isLegal: boolean;
  averageScore: number;
}
type legalMoves = Record<Direction, MoveInfo>


export function pureMonteCarloSearch(currentState: Board): Direction | null {
  const startTime = performance.now();
  // Attempt to perform 4 moves & save in object if successful
  const legalMoves: legalMoves = {
    left: { isLegal: false, averageScore: 0},
    right: { isLegal: false, averageScore: 0},
    up: { isLegal: false, averageScore: 0},
    down: { isLegal: false, averageScore: 0}
  };
  const directions: Direction[] = ["left", "up", "right", "down"];
  directions.forEach((direction) => {
    const [isLegal, _] = bareMove(deepCopy(currentState), direction);
    legalMoves[direction].isLegal = isLegal;
  })

  for (const [dir, info] of Object.entries(legalMoves)) {

    if (!info.isLegal) continue;
    
    const numSimulations = 100;
    const maxDepth = 100;
    for (let i = 0; i < numSimulations; i++) {
      const boardCopy = deepCopy(currentState);
      let [_, score] = bareMove(boardCopy, dir);
      let depth = 1;
      let shuffledDirIdx = shuffledArray(directions.length);
      // repeat moves
      while (shuffledDirIdx.length && depth < maxDepth) {
        let randDir = directions[shuffledDirIdx.pop()!]
        const [moved, scoreDiff] = bareMove(boardCopy, randDir);

        // refresh array of direction indices
        if (moved) {
          shuffledDirIdx = shuffledArray(directions.length);
          score += scoreDiff;
          depth += 1;
          const val = Math.random() > 0.9 ? 4 : 2;
          const preferredOrder = shuffledArray(16);
          addTile(boardCopy, val, preferredOrder);
        }
      }
      info.averageScore += score
    }
    info.averageScore /= numSimulations;
  }
  //console.log(JSON.stringify(legalMoves))
  console.log(`PMCS Performance: ${performance.now() - startTime}ms`)
  return directions.reduce<Direction | null>((best, dir) => {
    if (!legalMoves[dir].isLegal) return best;
    if (
      !best || legalMoves[dir].averageScore > legalMoves[best].averageScore
    ) {
      return dir;
    }
    return best;
    }, null);
}






