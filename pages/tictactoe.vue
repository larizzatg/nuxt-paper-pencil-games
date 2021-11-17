<template>
  <div class="min-h-screen p-2">
    <div v-for="(row, i) in currentBoard" :key="i" class="flex">
      <div
        v-for="(col, j) in row"
        :key="`${i}-${j}`"
        class="flex items-center justify-center w-12 h-12 border-2 border-purple-400  items"
        @click="makeMove({ col: j, row: i })"
      >
        {{ col }}
      </div>
    </div>
    <button @click="undo">Undo</button>
    <button @click="redo">Redo</button>
    <pre>
      {{ boards }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useTicTacToe } from '~/composables/useTicTacToe'

export default defineComponent({
  setup() {
    const { currentBoard, makeMove, boards, undo, redo } = useTicTacToe()
    return { currentBoard, makeMove, boards, undo, redo }
  },
})
</script>
