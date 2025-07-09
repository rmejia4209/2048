
import { flatMap, deepCopy } from "../utils/utils";
import type { Board, Tile, Coordinates, Game, PowerUps } from "./types";

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

function getFirstEmptyTile(board:Board, order: number[]): Coordinates {

  const sortedTiles = board.flat().map((t) => t).sort((a, b) => a.id - b.id)

  for (const target of order) {
    if (sortedTiles[target].value === 0) {
      return [sortedTiles[target].row, sortedTiles[target].col]
    }
  }
  // TODO handle undefined return gracefully (should always be safe)
  return [-1, -1]
}


export function isGameOver(game: Game): void {

  const board = game[game.length - 1].board;
  const emptyTiles = board.flat().filter((t) => t.value === 0);

  if (emptyTiles.length > 0) return;
  
  const matchesAvailable = flatMap(board, (tile, _) => (
    hasMatchingNeighbors(tile, board)
  )).some(t => t);
  if (matchesAvailable) return;
  game.at(-1)!.isGameOver = true;
}

function addTile(
  board:Board, value: number, preferredOrder: number[]
): void {
    const [row, col] = getFirstEmptyTile(board, preferredOrder)
    board[row][col].value = value;
    return; 
  }
  

export function initGame(preferredOrder: number[]): Game {

  // row === 0 && col === 0 ? 0 : 2**((4*row+col))
  const size = 4
  const board: Board = Array.from({ length: size }, (_, row) => (
    Array.from({ length: size}, (_, col) => ({
      id: ((4*row) + col), value: 0, row: row, col: col
    }))
  ));
  addTile(board, 2, preferredOrder);
  addTile(board, 2, preferredOrder.slice(1));
  const powerups: PowerUps = { undos: 0, swaps: 0 }
  const game: Game = [{
    board: board,
    score: 0,
    turn: 0,
    powerups: powerups,
    isGameOver: false,
    powerUpUsage: {undos: 0, swaps: 0}
  }];
  
  return game;
}




function* getRowAndCol(
  key: string, boardSize: number, stack?: any[]
): IterableIterator<[number, number]> {

  const inBounds = (value: number) => -1 < value && value < boardSize;

  let rowStart: number, colStart: number, direction: number, holdRow: boolean;
  switch (key) {
    case "up":
    case "ArrowUp":
      [rowStart, colStart, direction, holdRow] = [0, 0, 1, false];
      break;
    case "left":
    case "ArrowLeft":
      [rowStart, colStart, direction, holdRow] = [0, 0, 1, true];
      break;
    case "down":
    case "ArrowDown":
      [rowStart, colStart, direction, holdRow] = [boardSize-1, 0, -1, false];
      break;
    case "right":
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
    case 128:
      powerups.swaps += powerups.swaps < 2 ? 1 : 0;
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


/**
 *  Performance: 0 to 1 ms
 * 
 * @param key 
 * @param game 
 * @param val 
 * @param preferredOrder 
 * @returns 
 */
export function move(
  key: string, game: Game, val: number, preferredOrder: number[]
): Game {
  let numMoves = 0;
  let score = 0;
  const gameCopy = deepCopy(game);
  const nextState = deepCopy(gameCopy[gameCopy.length - 1])

  numMoves += slide(key, nextState.board);
  score += merge(key, nextState.board, nextState.powerups);
  numMoves += slide(key, nextState.board);
  nextState.score += score
  if (numMoves > 0 || score > 0) {
    addTile(nextState.board, val, preferredOrder);
    nextState.turn += 1;
    gameCopy.push(nextState);
    isGameOver(gameCopy);
    //nextState.isGameOver=true
    if (gameCopy.length === 5) gameCopy.shift();
    return gameCopy;
  };
  return game;
}

// TODO: stats not increment correctly - verify and fix
export function undoMove(game: Game): Game {
  
  let numberUndos = game.at(-1)!.powerups.undos;
  let currentTurn = game.at(-1)!.turn;

  if (game.length > 1 && numberUndos > 0) {
    const nextState = deepCopy(game);
    nextState.pop();
    nextState.at(-1)!.powerups.undos = (numberUndos - 1) as 0 | 1;
    nextState.at(-1)!.turn = currentTurn;
    nextState.at(-1)!.powerUpUsage.undos += 1;
    return nextState
  }
  return game
}

export function swapTilesPowerUp(id_1: number, id_2: number, game: Game) {

  if (game.length < 1 || game.at(-1)!.powerups.swaps < 1) return game
  const nextState = deepCopy(game);
  const nextFrame = deepCopy(nextState.at(-1)!);
  // TODO figure out this error proofing
  const findTile = (id: number): Tile | undefined => {
    for (let row = 0; row < nextFrame.board.length; row++) {
      for (let col = 0; col < nextFrame.board.length; col++) {
        if (nextFrame.board[row][col].id === id) {
          return nextFrame.board[row][col]
        }
      }
    }
    return;
  }
  swapTiles(findTile(id_1)!, findTile(id_2)!);
  nextFrame.powerUpUsage.swaps += 1;
  nextFrame.turn += 1;
  nextFrame.powerups.swaps -= 1;
  nextState.push(nextFrame);
  if (nextState.length === 5) nextState.shift();
  return nextState
}