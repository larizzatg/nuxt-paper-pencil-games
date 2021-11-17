import { ref, computed, readonly } from '@nuxtjs/composition-api'
import { Board, Move, Player } from '~/types/tictactoe'

export function useTicTacToe(initialState?: Board[]) {
  const initialBoard: Board = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ]
  const boards = ref<Board[]>(initialState || [initialBoard])
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

  const canUndo = computed(() => currentMove.value > 0)
  const undo = () => {
    if (canUndo.value) {
      currentMove.value -= 1
    }
  }

  const canRedo = computed(() => !!boards.value[currentMove.value + 1])
  const redo = () => {
    if (canRedo.value) {
      currentMove.value += 1
    }
  }

  return {
    canUndo,
    undo,
    canRedo,
    redo,
    makeMove,
    boards: readonly(boards),
    currentPlayer: readonly(currentPlayer),
    currentBoard: computed(() => boards.value[currentMove.value]),
  }
}
