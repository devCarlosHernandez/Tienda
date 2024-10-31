import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authStore'
import AppDashboard from '../views/AppDashboard.vue' // Asegúrate de importar la vista AppDashboard

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AppLogin.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard', // Agrega un nombre a esta ruta para facilitar la navegación
      component: AppDashboard,
    },
  ],
})

// Agrega el guard de navegación
router.beforeEach(async to => {
  const authStore = useAuthStore()

  // Si el usuario no está autenticado y no está yendo a la página de login, redirige al login
  if (!authStore.user && to.name !== 'login') {
    return { name: 'login' }
  }

   // Si el usuario está autenticado y está intentando acceder a la página de login, redirige al dashboard
   if (authStore.user && to.name === 'login') {
    return { name: 'dashboard' }; // Cambia esto según tus necesidades
  }

})

export default router
