import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authStore'
import AppDashboard from '../views/AppDashboard.vue' // Asegúrate de importar la vista AppDashboard
import AppCategorias from '../views/AppCategorias.vue'
import AppMarcas from '../views/AppMarcas.vue'
import AgregarMarca from '../components/AgregarMarca.vue'
import AppProveedores from '../views/AppProveedores.vue'
import AgregarProveedor from '../components/AgregarProveedor.vue'
import AppProductos from '../views/AppProductos.vue'
import AppActivity from '../views/AppActivity.vue'
import AgregarCategoria from '../components/AgregarCategoria.vue'

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
      name: 'dashboard',
      component: AppDashboard,
    },
    {
      path: '/marcas',
      name: 'marcas',
      component: AppMarcas,
    },
    {
      path: '/agregar-marca',
      name: 'agregarMarca',
      component: AgregarMarca,
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: AppCategorias,
    },
    {
      path: '/agregar-categoria',
      name: 'agregar-categoria',
      component: AgregarCategoria, // Ruta para agregar categoría
    },
    {
      path: '/productos',
      name: 'productos',
      component: AppProductos,
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      component: AppProveedores,
    },
    {
      path: '/agregar-proveedor',
      name: 'AgregarProveedor',
      component: AgregarProveedor,
    },
    {
      path: '/activity',
      name: 'activity',
      component: AppActivity,
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
    return { name: 'dashboard' }
  }
})

export default router
