// authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

// Configurar la URL base de Axios
axios.defaults.baseURL = 'http://localhost:8000' // Asegúrate de que esta URL sea correcta

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async handleLogin(credentials) {
      try {
        const response = await axios.post('/api/login', credentials)
        this.token = response.data.token // Guarda el token
        localStorage.setItem('token', this.token) // Almacena el token en localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}` // Establece el token en los headers

        this.user = response.data.user // Guarda la información del usuario
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get('/api/user')
        this.user = response.data
      } catch (error) {
        console.error('Failed to fetch user:', error)
        throw error
      }
    },
  },
})
