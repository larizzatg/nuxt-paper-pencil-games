export type EmptyCell = '-'
export const enum Player {
  x = 'x',
  o = 'o',
}

export interface Move {
  col: number
  row: number
}

export type Board = (Player | EmptyCell)[][]
