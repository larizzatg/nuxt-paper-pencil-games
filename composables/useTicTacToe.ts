import { ref, computed, readonly } from '@nuxtjs/composition-api'

type EmptyCell = '-'
export const enum Player {
  x = 'x',
  o = 'o',
}

interface Move {
  col: number
  row: number
}

type Board = (Player | EmptyCell)[][]

export function useTicTacToe() {
  const initialBoard: Board = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ]
  const currentPlayer = ref<Player>(Player.o)

  function makeMove({ col, row }: Move) {
    const newState: Board = [...boards.value[boards.value.length - 1]]

    if (newState[row][col] !== '-') {
      return
    }

    newState[row][col] = currentPlayer.value
    boards.value.push(newState)
    currentPlayer.value = currentPlayer.value === Player.o ? Player.x : Player.o
  }

  const boards = ref<Board[]>([initialBoard])
  return {
    makeMove,
    boards: readonly(boards),
    currentBoard: computed(() => boards.value[boards.value.length - 1]),
  }
}
