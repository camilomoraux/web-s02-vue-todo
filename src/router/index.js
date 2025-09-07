import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Puedes agregar tus rutas aquí
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('../views/TodosView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
