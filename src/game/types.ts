

export type Tile = {
  id: number;
  value: number;
  row: number;
  col: number;
};

export type Board = Tile[][];

export type PowerUps = {
  undos: 0 | 1 | 2 | typeof Infinity;
  swaps: 0 | 1 | 2 | typeof Infinity;
};

export type PowerUpUsageStats = {[K in keyof PowerUps]: number;}

type Frame = {
  board: Board;
  score: number;
  turn: number;
  powerups: PowerUps;
  isGameOver: boolean;
  powerUpUsage: PowerUpUsageStats;
};

export type Game = Frame[];

export type Coordinates = [number, number];
