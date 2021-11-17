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
  const currentMove = ref(0)

  function makeMove({ col, row }: Move) {
    const newState: Board = JSON.parse(
      JSON.stringify([...boards.value[currentMove.value]])
    )

    if (newState[row][col] !== '-') {
      return
    }

    newState[row][col] = currentPlayer.value
    boards.value.push(newState)
    currentPlayer.value = currentPlayer.value === Player.o ? Player.x : Player.o
    currentMove.value += 1
  }

  const boards = ref<Board[]>([initialBoard])
  return {
    undo: () => (currentMove.value -= 1),
    redo: () => (currentMove.value += 1),
    makeMove,
    boards: readonly(boards),
    currentBoard: computed(() => boards.value[currentMove.value]),
  }
}
