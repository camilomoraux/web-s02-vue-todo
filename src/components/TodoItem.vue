<template>
  <li
    class="group border rounded-lg p-4 flex items-start gap-4 bg-white shadow-sm hover:shadow-md transition-shadow"
  >
    <select
      v-model="local.state"
      @change="emitUpdateState"
      class="text-xs border rounded px-1 py-1 bg-zinc-50"
    >
      <option value="todo">Pendiente</option>
      <option value="doing">En Proceso</option>
      <option value="done">Lista</option>
      <option value="archived">Archivada</option>
    </select>
    <div class="flex-1">
      <input
        v-if="editing"
        v-model="editTitle"
        @keyup.enter="save"
        @blur="save"
        class="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
      <p v-else :class="['text-sm', local.state === 'done' ? 'line-through text-zinc-400' : '']">
        {{ local.title }}
      </p>
      <p class="text-[11px] text-zinc-500 mt-1">{{ stateLabel }}</p>
      <div class="mt-2">
        <template v-if="editing">
          <textarea
            v-model="editDescription"
            rows="2"
            class="w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring focus:ring-blue-200 resize-y"
            :class="editDescription.length > MAX_DESC ? 'border-red-400' : ''"
            placeholder="Descripción (opcional)"
          ></textarea>
          <div
            class="flex justify-end text-[10px] mt-1"
            :class="editDescription.length > MAX_DESC ? 'text-red-600' : 'text-zinc-500'"
          >
            {{ editDescription.length }} / {{ MAX_DESC }}
          </div>
        </template>
        <p v-else-if="local.description" class="text-xs text-zinc-600 whitespace-pre-line">
          {{ local.description }}
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        v-if="!editing"
        @click="start"
        class="btn-secondary !px-2 !py-1 text-[11px] flex items-center gap-1"
      >
        <span aria-hidden>✏️</span> Editar
      </button>
      <button
        v-else
        @click="cancel"
        class="btn-neutral !px-2 !py-1 text-[11px] flex items-center gap-1"
      >
        <span aria-hidden>↩</span> Cancelar
      </button>
      <button @click="remove" class="btn-danger !px-2 !py-1 text-[11px] flex items-center gap-1">
        <span aria-hidden>🗑️</span> Eliminar
      </button>
    </div>
  </li>
</template>

<script setup>
import { ref, computed, watch, toRaw } from 'vue'

const props = defineProps({
  todo: { type: Object, required: true },
})
const emits = defineEmits(['update:todo', 'remove'])

// Clonación superficial segura (los objetos de tarea son planos)
const local = ref({ ...props.todo })
const editing = ref(false)
const editTitle = ref('')
const editDescription = ref('')
const MAX_DESC = 500

watch(
  () => props.todo,
  (nv) => {
    if (!editing.value) local.value = { ...nv }
  },
  { deep: true },
)

function start() {
  editing.value = true
  editTitle.value = local.value.title
  editDescription.value = local.value.description || ''
}
function cancel() {
  editing.value = false
  editTitle.value = ''
  editDescription.value = ''
  local.value = { ...props.todo }
}
function save() {
  if (!editing.value) return
  const title = editTitle.value.trim()
  if (title) local.value.title = title
  if (editDescription.value.length <= MAX_DESC) {
    local.value.description = editDescription.value.trim()
  }
  editing.value = false
  emitUpdate()
}
function remove() {
  emits('remove', local.value.id) // confirmación sucede en vista padre
}
function emitUpdate() {
  emits('update:todo', toRaw(local.value))
}
function emitUpdateState() {
  emitUpdate()
}

const stateLabel = computed(() => {
  const s = local.value.state
  return s === 'todo'
    ? 'Pendiente'
    : s === 'doing'
      ? 'En proceso'
      : s === 'done'
        ? 'Lista'
        : 'Archivada'
})
</script>

<style scoped>
.btn-secondary {
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
  border-radius: 0.375rem;
  padding: 0.25rem 0.75rem;
  line-height: 1;
}
.btn-secondary:hover {
  background: #dbeafe;
}
.btn-neutral {
  background: #f4f4f5;
  color: #52525b;
  border: 1px solid #d4d4d8;
  border-radius: 0.375rem;
  padding: 0.25rem 0.75rem;
  line-height: 1;
}
.btn-neutral:hover {
  background: #e4e4e7;
}
.btn-danger {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  padding: 0.25rem 0.75rem;
  line-height: 1;
}
.btn-danger:hover {
  background: #fee2e2;
}
button {
  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    opacity 0.18s ease;
}
</style>
