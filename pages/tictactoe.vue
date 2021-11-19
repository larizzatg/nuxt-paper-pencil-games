<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-2 bg-gray-800 "
  >
    <h1 class="my-4 text-4xl font-bold text-gray-100 uppercase">TicTacToe</h1>
    <div v-for="(row, rowIdx) in currentBoard" :key="rowIdx" class="flex">
      <div
        v-for="(col, colIdx) in row"
        :key="`${rowIdx}-${colIdx}`"
        class="flex items-center justify-center text-3xl font-semibold border-2 border-gray-100 cursor-pointer  w-28 h-28"
        :class="{
          'bg-green-200': col === '-',
          'bg-green-300 text-green-600': col === 'o',
          'bg-green-500 text-green-200': col === 'x',
        }"
        :data-test="`row-${rowIdx}-col-${colIdx}`"
        @click="makeMove({ row: rowIdx, col: colIdx })"
      >
        {{ col }}
      </div>
    </div>
    <div class="mt-4">
      <button
        data-test="undo-move"
        class="inline-flex justify-center px-4 py-2 mx-1 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md shadow-sm  hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:opacity-40 disabled:pointer-events-none"
        :disabled="!canUndo"
        @click="undo"
      >
        Undo
      </button>
      <button
        data-test="redo-move"
        class="inline-flex justify-center px-4 py-2 mx-1 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md shadow-sm  hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:opacity-40 disabled:pointer-events-none"
        :disabled="!canRedo"
        @click="redo"
      >
        Redo
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useTicTacToe } from '~/composables/useTicTacToe'

export default defineComponent({
  setup() {
    const { currentBoard, makeMove, canUndo, undo, canRedo, redo } =
      useTicTacToe()
    return { currentBoard, makeMove, canUndo, undo, canRedo, redo }
  },
})
</script>
