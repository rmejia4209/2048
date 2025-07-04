
import { randInt, flatMap, deepCopy } from "../utils/utils";

type Tile = {
  id: number;
  value: number;
  row: number
  col: number
}

type PowerUps = {
  undos: 0 | 1 | 2;
}

export type Board = Tile[][];
export type Game = {
  board: Board; score: number; turn: number; powerups: PowerUps
}[];
type Coordinates = [number, number][]


export function printBoard(board: Board): void {
  for (const row of board) {
    const line = row.map(tile => `${tile.id}-${tile.value}`).join(' | ');
    console.log(line);
  }
}


function hasMatchingNeighbors(tile: Tile, board: Board): boolean {

  const inBounds = (value: number) => -1 < value && value < board.length;

  for (const [rowDiff, colDiff] of [[0, -1], [1, 0], [0, 1], [1, 0]]) {
    let [neighborRow, neighborCol] = [tile.row + rowDiff, tile.col + colDiff];
    if (inBounds(neighborRow) && inBounds(neighborCol)) {
      if (tile.value === board[neighborRow][neighborCol].value) return true;
    }
  }
  return false;

}

function swapTiles(a: Tile, b: Tile) {
  [a.id, b.id] = [b.id, a.id];
  [a.value, b.value] = [b.value, a.value];
}

function getEmptyTiles(board:Board): Coordinates {

  const emptyTiles: Coordinates = []
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (board[row][col].value === 0) emptyTiles.push([row, col]);
    }
  }
  return emptyTiles;
}


export function isGameOver(board: Board) {

  if (getEmptyTiles(board).length > 0) return false;
  
  const matchesAvailable = flatMap(board, (tile, _) => (
    hasMatchingNeighbors(tile, board)
  )).some(t => t);
  if (matchesAvailable) return false;

  return true
}

export function addRandomTile(board:Board, value?: number): void {

  const emptyTiles: Coordinates = getEmptyTiles(board);
  const [row, col] = emptyTiles[randInt(0, emptyTiles.length)];
  board[row][col].value = value ? value : randInt(1, 3) * 2;
  return; 
  }
  

export function initGame(size: number = 4): Game {

  // 2**(2+(4*row+col))
  const board: Board = Array.from({ length: size }, (_, row) => (
    Array.from({ length: size}, (_, col) => ({
      id: ((4*row) + col), value: 0, row: row, col: col
    }))
  ));
  addRandomTile(board, 2);
  addRandomTile(board, 2);
  const powerups: PowerUps = {undos: 0}
  const game: Game = [{board: board, score: 0, turn: 0, powerups: powerups}];
  
  return game;
}




function* getRowAndCol(
  key: string, boardSize: number, stack?: any[]
): IterableIterator<[number, number]> {

  const inBounds = (value: number) => -1 < value && value < boardSize;

  let rowStart: number, colStart: number, direction: number, holdRow: boolean;
  switch (key) {
      case "ArrowUp":
        [rowStart, colStart, direction, holdRow] = [0, 0, 1, false];
        break;
      case "ArrowLeft":
        [rowStart, colStart, direction, holdRow] = [0, 0, 1, true];
        break;
      case "ArrowDown":
        [rowStart, colStart, direction, holdRow] = [boardSize-1, 0, -1, false];
        break;
      case "ArrowRight":
        [rowStart, colStart, direction, holdRow] = [0, boardSize-1, -1, true];
        break;
      default:
        // TODO: raise error
        return;
    }
    let col = colStart;
    let row = rowStart;
    while (inBounds(row) && inBounds(col)) {
      yield [row, col];
      if (holdRow) {
        col += direction;
        if (!inBounds(col)) {
          row++;
          col = colStart;
          if (Array.isArray(stack)) {stack.length = 0;}
        }
      } else {
        row += direction;
        if (!inBounds(row)) {
          col++;
          row = rowStart;
          if (Array.isArray(stack)) stack.length = 0
        }
      }
    }
}


function addPowerUps(value: number, powerups: PowerUps): void {

  switch (value) {
    case 32:
      powerups.undos += powerups.undos < 2 ? 1 : 0;
      return;
    default:
      return;
  }

}

function slide(key: string, board: Board): number {

  const emptyTiles: {row: number; col: number;}[] = [];
  let numSwaps = 0;
  for (const [row, col] of getRowAndCol(key, board.length, emptyTiles)) {
    const tile = board[row][col];

    if (tile.value === 0) {
      emptyTiles.push({row: row, col: col})
    } else if (emptyTiles.length) {
      const emptyTile = emptyTiles.shift()!;
      swapTiles(board[row][col], board[emptyTile.row][emptyTile.col]);
      emptyTiles.push({row: row, col: col})
      numSwaps++
    }
  }
  return numSwaps;
}

function merge(key: string, board: Board, powerups: PowerUps): number {

  let mergeTile: {row: number; col: number; tile: Tile}[] = []
  let score = 0;
  for (const [row, col] of getRowAndCol(key, board.length, mergeTile)) {
    const tile = board[row][col];

    if (tile.value !== 0) {
      if (mergeTile.length && mergeTile[0].tile.value === tile.value) {
        swapTiles(
          board[mergeTile[0].row][mergeTile[0].col], board[row][col]
        )
        board[mergeTile[0].row][mergeTile[0].col].value *= 2;
        score += board[mergeTile[0].row][mergeTile[0].col].value;
        addPowerUps(board[mergeTile[0].row][mergeTile[0].col].value, powerups)
        board[row][col].value = 0;
        mergeTile.length = 0;
      } else {
        mergeTile[0] = {row: row, col: col, tile: tile};
      }
    }
  }
  return score;
}

export function move(key: string, game: Game): Game {
  console.log("In move")
  const startTime = performance.now();
  let numMoves = 0;
  let score = 0;
  const gameCopy = deepCopy(game);
  const nextState = deepCopy(gameCopy[gameCopy.length - 1])


  numMoves += slide(key, nextState.board);
  score += merge(key, nextState.board, nextState.powerups);
  numMoves += slide(key, nextState.board);
  nextState.score += score
  if (numMoves > 0 || score > 0) {
    addRandomTile(nextState.board);
    nextState.turn += 1;
    gameCopy.push(nextState);
    if (gameCopy.length === 5) gameCopy.shift();
    console.log(`Change: ${performance.now() - startTime}ms`)
    return gameCopy;
  };
  console.log(`No Change: ${performance.now() - startTime}ms`)
  return game;
}
