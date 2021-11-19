import { mount } from '@vue/test-utils'
import { makeMove, undo, redo } from './useTicTacToe'
import Tictactoe from '~/pages/tictactoe.vue'
import { Board, Player } from '~/types/tictactoe'

describe('TicTacToeGame', () => {
  it('makeMove', () => {
    const initial: Board = [
      [Player.o, '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ]
    const expected: Board = [
      [Player.o, '-', '-'],
      ['-', Player.x, '-'],
      ['-', '-', '-'],
    ]

    const { newBoard, newPlayer, moveCount } = makeMove(initial, Player.x, 0, {
      col: 1,
      row: 1,
    })
    expect(newBoard).toEqual(expected)
    expect(newPlayer).toEqual(Player.o)
    expect(moveCount).toEqual(1)
  })

  it('cant undo first move', () => {
    const actual = undo(0)
    expect(actual).toBe(0)
  })

  it('can undo moves after first', () => {
    const actual = undo(1)
    expect(actual).toBe(0)
  })

  it('cant redo last move', () => {
    const actual = redo(0, 2)
    expect(actual).toBe(1)
  })

  it('cant redo moves if isnt last', () => {
    const actual = redo(0, 2)
    expect(actual).toBe(1)
  })
})

describe('TicTacToeApp', () => {
  it('plays a game', async () => {
    const wrapper = mount(Tictactoe)

    const firstCell = wrapper.find('[data-test=row-0-col-0]')
    const secondCell = wrapper.find('[data-test=row-0-col-1]')
    const thirdCell = wrapper.find('[data-test=row-0-col-2]')
    const undoButton = wrapper.find('[data-test=undo-move]')
    const redoButton = wrapper.find('[data-test=redo-move]')

    expect(undoButton.attributes().disabled).toBeDefined()
    expect(redoButton.attributes().disabled).toBeDefined()

    await firstCell.trigger('click')
    expect(firstCell.text()).toBe(Player.o)

    await secondCell.trigger('click')
    expect(secondCell.text()).toBe(Player.x)

    await thirdCell.trigger('click')
    expect(thirdCell.text()).toBe(Player.o)

    await undoButton.trigger('click')
    expect(thirdCell.text()).toBe('-')
    expect(redoButton.attributes().disabled).toBeUndefined()

    await redoButton.trigger('click')
    expect(thirdCell.text()).toBe(Player.o)
    expect(redoButton.attributes().disabled).toBeDefined()
  })
})
