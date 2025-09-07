<template>
  <section
    class="max-w-3xl mx-auto mt-8 px-6 py-6 rounded-xl border border-zinc-200 bg-white shadow-sm leading-relaxed"
  >
    <h1 class="text-3xl font-bold tracking-tight mb-4">Gestor de Tareas</h1>
    <p class="text-zinc-700">
      Esta aplicación te permitirá administrar tus tareas diarias de manera sencilla.
    </p>
    <ul class="list-disc ml-6 my-4 space-y-1 text-zinc-700">
      <li>Agregar nuevas tareas con un título y (opcional) descripción.</li>
      <li>Editar tareas existentes para actualizar su información.</li>
      <li>Eliminar tareas que ya no necesitas.</li>
      <li>
        Marcar el estado de cada tarea como: <strong>lista</strong>, <strong>en proceso</strong> o
        <strong>archivada</strong>.
      </li>
    </ul>
    <p class="text-zinc-600">
      Empezaremos creando la estructura básica y luego agregaremos persistencia local (localStorage)
      y filtros por estado.
    </p>
    <RouterLink
      class="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow transition-colors"
      to="/todos"
      >Ir al listado inicial de tareas</RouterLink
    >
  </section>
</template>

<script setup>
// Vista inicial descriptiva
</script>

<style scoped></style>
