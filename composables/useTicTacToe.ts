import { ref, computed, readonly } from '@nuxtjs/composition-api'
import { Board, Move, Player } from '~/types/tictactoe'

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

  const undo = () => {
    if (currentMove.value === 0) {
      return
    }
    currentMove.value -= 1
  }

  const redo = () => {
    if (!boards.value[currentMove.value + 1]) {
      return
    }
    currentMove.value += 1
  }
  const boards = ref<Board[]>([initialBoard])
  return {
    undo,
    redo,
    makeMove,
    boards: readonly(boards),
    currentBoard: computed(() => boards.value[currentMove.value]),
  }
}
