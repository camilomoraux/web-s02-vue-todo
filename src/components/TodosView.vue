<template>
  <section>
    <h1>Tareas</h1>
    <ul>
      <li v-for="t in todos" :key="t.id">{{ t.text }}</li>
    </ul>
    <RouterLink to="/">Volver</RouterLink>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([
  { id: 1, text: 'Aprender Vue 3' },
  { id: 2, text: 'Configurar Router' },
])
</script>
