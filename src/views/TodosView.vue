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
      <li
        v-for="t in filtered"
        :key="t.id"
        class="border rounded-md p-3 flex items-start gap-3 bg-white shadow-sm"
      >
        <select v-model="t.state" class="text-xs border rounded px-1 py-1 bg-zinc-50">
          <option value="todo">Pendiente</option>
          <option value="doing">En Proceso</option>
          <option value="done">Lista</option>
          <option value="archived">Archivada</option>
        </select>
        <div class="flex-1">
          <input
            v-if="editingId === t.id"
            v-model="editTitle"
            @keyup.enter="saveEdit(t)"
            @blur="saveEdit(t)"
            class="w-full border rounded px-2 py-1 text-sm"
          />
          <p v-else :class="['text-sm', t.state === 'done' ? 'line-through text-zinc-400' : '']">
            {{ t.title }}
          </p>
          <p class="text-[11px] text-zinc-500 mt-1">{{ formatState(t.state) }}</p>
        </div>
        <div class="flex flex-col gap-1">
          <button
            v-if="editingId !== t.id"
            @click="startEdit(t)"
            class="text-xs text-blue-600 hover:underline"
          >
            Editar
          </button>
          <button v-else @click="cancelEdit" class="text-xs text-zinc-500 hover:underline">
            Cancelar
          </button>
          <button @click="removeTodo(t.id)" class="text-xs text-red-600 hover:underline">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
    <p v-else class="text-sm text-zinc-500">Sin tareas para este filtro.</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'todos-v1'

const newTitle = ref('')
const todos = ref(load())
const currentFilter = ref('all')
const editingId = ref(null)
const editTitle = ref('')

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

function startEdit(t) {
  editingId.value = t.id
  editTitle.value = t.title
  // focus managed by browser order
}
function cancelEdit() {
  editingId.value = null
  editTitle.value = ''
}
function saveEdit(t) {
  if (editingId.value !== t.id) return
  const title = editTitle.value.trim()
  if (title) t.title = title
  cancelEdit()
}

const filtered = computed(() => {
  if (currentFilter.value === 'all') return todos.value
  return todos.value.filter((t) => t.state === currentFilter.value)
})

function formatState(state) {
  return state === 'todo'
    ? 'Pendiente'
    : state === 'doing'
      ? 'En proceso'
      : state === 'done'
        ? 'Lista'
        : 'Archivada'
}

watch(todos, persist, { deep: true })
</script>

<style scoped></style>
