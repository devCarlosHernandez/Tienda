// authStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; // Asegúrate de que esta URL sea correcta

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user, // Verifica si hay un usuario autenticado
  },
  actions: {
    async handleLogin(credentials) {
      try {
        const response = await axios.post('/api/login', credentials);
        this.token = response.data.token; // Guarda el token
        localStorage.setItem('token', this.token); // Almacena el token en localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`; // Establece el token en los headers

        this.user = response.data.user; // Guarda la información del usuario
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get('/api/user');
        this.user = response.data; // Guarda la información del usuario
      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
      }
    },
    logout() {
      this.user = null; // Limpia la información del usuario
      this.token = null; // Limpia el token
      localStorage.removeItem('token'); // Elimina el token del localStorage
      delete axios.defaults.headers.common['Authorization']; // Elimina el header de autorización
    },
    async initializeStore() {
      if (this.token) {
        // Establecer el token en el header
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        await this.fetchUser(); // Recuperar el usuario
      }
    },
  },
});

