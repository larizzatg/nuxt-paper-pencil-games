import { Player, useTicTacToe } from './useTicTacToe'

describe('tictactoe', () => {
  test('make move', () => {
    const expected = [
      [Player.o, '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ]
    const { currentBoard, makeMove } = useTicTacToe()

    makeMove({ col: 0, row: 0 })
    expect(currentBoard.value).toEqual(expected)

    makeMove({ col: 1, row: 1 })
    const expectedSecondMove = [
      [Player.o, '-', '-'],
      ['-', Player.x, '-'],
      ['-', '-', '-'],
    ]
    expect(currentBoard.value).toEqual(expectedSecondMove)
  })
  test('has an empty board initially', () => {
    const { currentBoard } = useTicTacToe()
    expect(currentBoard.value).toEqual([
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ])
  })
})
