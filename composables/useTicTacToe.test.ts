import { Player, useTicTacToe } from './useTicTacToe'

describe('tictactoe', () => {
  test('make move', () => {
    const expected = [
      [Player.o, '-', '-'],
      ['-', Player.x, '-'],
      ['-', '-', '-'],
    ]
    const { currentBoard, makeMove } = useTicTacToe()
    makeMove({ col: 0, row: 0 })
    makeMove({ col: 1, row: 1 })
    makeMove({ col: 1, row: 1 })

    expect(currentBoard.value).toEqual(expected)
  })
  test('has an empty board initially', () => {
    const { currentBoard } = useTicTacToe()
    expect(currentBoard.value).toEqual([
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ])
  })
  test('can undo a move', () => {
    const expected = [
      [Player.o, '-', '-'],
      ['-', Player.x, '-'],
      ['-', '-', '-'],
    ]
    const { currentBoard, makeMove, undo } = useTicTacToe()
    makeMove({ col: 0, row: 0 })
    makeMove({ col: 1, row: 1 })
    makeMove({ col: 1, row: 1 })

    expect(currentBoard.value).toEqual(expected)

    const undidState = [
      [Player.o, '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ]

    undo()

    expect(currentBoard.value).toEqual(undidState)
  })
})
