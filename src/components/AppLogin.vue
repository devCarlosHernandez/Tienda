<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Correo Electrónico</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>



import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:8000/login', {
          email: this.email,
          password: this.password
        }, { withCredentials: true });

        if (response.status === 204) {
          console.log('Login exitoso');
          // Aquí puedes redirigir al usuario o manejar el estado de autenticación
          this.$router.push('/'); // Cambia a la ruta que desees
        }
      } catch (error) {
        this.error = error.response.data.message || 'Error al iniciar sesión';
        console.error('Error al iniciar sesión:', this.error);
      }
    }
  }
};
</script>

<style>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
