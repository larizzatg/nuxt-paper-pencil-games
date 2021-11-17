import { useTicTacToe } from './useTicTacToe'
import { Player } from '~/types/tictactoe'

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
    const { currentBoard, undo, makeMove } = useTicTacToe()
    undo()

    expect(currentBoard.value).toEqual([
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ])

    makeMove({ col: 0, row: 0 })
    makeMove({ col: 1, row: 2 })

    expect(currentBoard.value).toEqual([
      [Player.o, '-', '-'],
      ['-', '-', '-'],
      ['-', Player.x, '-'],
    ])

    undo()
    expect(currentBoard.value).toEqual([
      [Player.o, '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ])
  })
  test('can redo a move', () => {
    const { currentBoard, redo, makeMove, undo } = useTicTacToe()
    redo()

    expect(currentBoard.value).toEqual([
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ])

    makeMove({ col: 0, row: 0 })
    makeMove({ col: 1, row: 2 })

    expect(currentBoard.value).toEqual([
      [Player.o, '-', '-'],
      ['-', '-', '-'],
      ['-', Player.x, '-'],
    ])

    undo()
    undo()
    redo()
    expect(currentBoard.value).toEqual([
      [Player.o, '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ])
  })
})
