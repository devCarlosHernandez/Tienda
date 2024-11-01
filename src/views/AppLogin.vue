<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="handleLogin">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          required
        />
        <label for="floatingInput">Email address</label>
      </div>

      <div class="form-floating">
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          required
        />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="form-check text-start my-3">
        <input
          class="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          value="remember-me"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Remember me
        </label>
      </div>

      <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
    </form>
  </main>
</template>

<script>
import { useAuthStore } from '../stores/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router' 

export default {
  setup() {
    // Cargar el store de autenticación
    const authStore = useAuthStore()
    const router = useRouter() // Inicializa el enrutador

    // Definir email y password usando ref para reactividad
    const email = ref('')
    const password = ref('')

    // Redefinir el método handleLogin para usar el store
    const handleLogin = async () => {
      try {
        await authStore.handleLogin({
          email: email.value,
          password: password.value,
        })

        // Fetch the user information after successful login
        await authStore.fetchUser() // Llama a fetchUser() para obtener la información del usuario

        // Redirigir después de iniciar sesión
        if (authStore.user) {
          router.push('/marcas') // Redirigir al dashboard o página de inicio
        }
      } catch (error) {
        console.error('Login failed:', error)
      }
    }

    return {
      email,
      password,
      handleLogin,
    }
  },
}
</script>

<style>
html,
body {
  height: 100%;
}

.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
