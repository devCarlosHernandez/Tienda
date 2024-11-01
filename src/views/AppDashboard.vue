<template>
  <div>
    <h1>Welcome, {{ user.name }}</h1>
    <p>Your email: {{ user.email }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router' // Importa el enrutador de Vue

export default {
  name: 'AppDashboard',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()

    const logout = () => {
      authStore.logout() // Llama al método logout del store
      router.push('/login') // Redirige al login
    }

    return {
      user: authStore.user,
      logout,
    }
  },
}
</script>

<style scoped>
/* Agrega estilos específicos para este componente */
</style>
