<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold tracking-tight">Tus Tareas</h1>
      <RouterLink to="/" class="text-sm text-blue-600 hover:underline">Inicio</RouterLink>
    </div>
    <form @submit.prevent="addTodo" class="flex gap-2 mb-6">
      <input
        v-model="newTitle"
        type="text"
        placeholder="Nueva tarea..."
        class="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      <button
        :disabled="!newTitle.trim()"
        class="bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
      >
        Agregar
      </button>
    </form>
    <div class="flex flex-wrap gap-3 mb-4 text-sm">
      <button
        v-for="f in filters"
        :key="f.value"
        @click="currentFilter = f.value"
        :class="[
          'px-3 py-1 rounded-full border',
          currentFilter === f.value
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white hover:bg-zinc-50 border-zinc-300',
        ]"
      >
        {{ f.label }}
      </button>
    </div>
    <ul class="space-y-2" v-if="filtered.length">
      <TodoItem
        v-for="t in filtered"
        :key="t.id"
        :todo="t"
        @update:todo="updateTodo"
        @remove="removeTodo"
      />
    </ul>
    <p v-else class="text-sm text-zinc-500">Sin tareas para este filtro.</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import TodoItem from '@/components/TodoItem.vue'

const STORAGE_KEY = 'todos-v1'

const newTitle = ref('')
const todos = ref(load())
const currentFilter = ref('all')

const filters = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendiente', value: 'todo' },
  { label: 'En Proceso', value: 'doing' },
  { label: 'Lista', value: 'done' },
  { label: 'Archivadas', value: 'archived' },
]

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? sample()
  } catch {
    return sample()
  }
}
function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
}

function sample() {
  return [
    { id: crypto.randomUUID(), title: 'Configurar proyecto', state: 'done' },
    { id: crypto.randomUUID(), title: 'Diseñar modelo de tareas', state: 'doing' },
    { id: crypto.randomUUID(), title: 'Implementar CRUD básico', state: 'todo' },
  ]
}

function addTodo() {
  const title = newTitle.value.trim()
  if (!title) return
  todos.value.unshift({ id: crypto.randomUUID(), title, state: 'todo' })
  newTitle.value = ''
}

function removeTodo(id) {
  todos.value = todos.value.filter((t) => t.id !== id)
}

function updateTodo(updated) {
  const idx = todos.value.findIndex((t) => t.id === updated.id)
  if (idx !== -1) todos.value[idx] = updated
}

const filtered = computed(() => {
  if (currentFilter.value === 'all') return todos.value
  return todos.value.filter((t) => t.state === currentFilter.value)
})

watch(todos, persist, { deep: true })
</script>

<style scoped></style>
