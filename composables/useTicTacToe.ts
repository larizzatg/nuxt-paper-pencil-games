import { ref, computed, readonly } from '@nuxtjs/composition-api'
import { Board, Move, Player } from '~/types/tictactoe'

// Functional Core
export function makeMove(
  current: Board,
  player: Player,
  moveCount: number,
  { col, row }: Move
) {
  const newBoard: Board = current.map((line, lineIdx) =>
    line.map((cell, cellIdx) =>
      row === lineIdx && cellIdx === col ? player : cell
    )
  )

  return {
    newBoard,
    newPlayer: player === Player.x ? Player.o : Player.x,
    moveCount: moveCount + 1,
  }
}

export function canUndo(count: number) {
  return count > 0
}

export function undo(count: number) {
  if (!canUndo(count)) {
    return 0
  }
  return count - 1
}

export function canRedo(currentCount: number, totalBoardsCount: number) {
  return currentCount + 1 < totalBoardsCount
}

export function redo(currentCount: number, totalBoardsCount: number) {
  if (!canRedo(currentCount, totalBoardsCount)) {
    return currentCount
  }

  return currentCount + 1
}

// Imperative Shell
export function useTicTacToe(initialState?: Board[]) {
  const initialBoard: Board = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ]
  const boards = ref<Board[]>(initialState || [initialBoard])

  const currentPlayer = ref<Player>(Player.o)
  const currentMove = ref(0)
  const currentBoard = computed(() => boards.value[currentMove.value])

  function move({ col, row }: Move) {
    const { newBoard, newPlayer, moveCount } = makeMove(
      currentBoard.value,
      currentPlayer.value,
      currentMove.value,
      {
        col,
        row,
      }
    )

    boards.value.push(newBoard)
    currentPlayer.value = newPlayer
    currentMove.value = moveCount
  }

  return {
    canUndo: () => {
      return canUndo(currentMove.value)
    },
    undo: () => {
      return (currentMove.value = undo(currentMove.value))
    },
    canRedo: () => {
      return canRedo(currentMove.value, boards.value.length)
    },
    redo: () => {
      currentMove.value = redo(currentMove.value, boards.value.length)
    },
    makeMove: move,
    boards: readonly(boards),
    currentPlayer: readonly(currentPlayer),
    currentBoard,
  }
}
