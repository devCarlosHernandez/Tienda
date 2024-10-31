<template>
  <header>
    <div class="wrapper">
      <div class="container">
        <header
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
        >
          <div class="col-md-3 mb-2 mb-md-0">
            <a
              href="/"
              class="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <!-- Logo o Título -->
            </a>
          </div>

          <ul
            class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
          >
            <li><a href="#" class="nav-link px-2 text-black">Home</a></li>
            <li><a href="#" class="nav-link px-2 text-black">Features</a></li>
            <li><a href="#" class="nav-link px-2 text-black">Pricing</a></li>
            <li><a href="#" class="nav-link px-2 text-black">FAQs</a></li>
            <li><a href="#" class="nav-link px-2 text-black">About</a></li>
          </ul>

          <div class="col-md-3 text-end">
            <button
              type="button"
              class="btn btn-outline-primary me-2"
              @click="handleAuthAction"
            >
              {{
                authStore.isAuthenticated ? 'Cerrar Sesion' : 'Iniciar Sesion'
              }}
            </button>
          </div>
        </header>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script>
import { useAuthStore } from './stores/authStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    onMounted(async () => {
      await authStore.initializeStore() // Inicializa el store al cargar la aplicación
    })

    const handleAuthAction = () => {
      if (authStore.isAuthenticated) {
        authStore.logout() // Cierra sesión
        router.push('/login') // Redirige al login
      } else {
        router.push('/login') // Redirige al login
      }
    }

    return {
      authStore, // Retorna el store para poder usarlo en el template
      handleAuthAction,
    }
  },
}
</script>

<style scoped>
/* Estilos específicos para el componente */
</style>
