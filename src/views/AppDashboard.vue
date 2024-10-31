<template>
  <div>
    <h1>Welcome, {{ user.name }}</h1>
    <p>Your email: {{ user.email }}</p>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore';

export default {
  name: 'AppDashboard',
  setup() {
    const authStore = useAuthStore();

    return {
      user: authStore.user,
    };
  },
};
</script>

<style scoped>
/* Agrega estilos específicos para este componente */
</style>
