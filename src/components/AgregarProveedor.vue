<template>
  <div class="container mt-4">
    <h1 class="text-center">Agregar Proveedor</h1>
    <form @submit.prevent="guardarProveedor">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" v-model="nombre" class="form-control" id="nombre" required />
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección</label>
        <input type="text" v-model="direccion" class="form-control" id="direccion" required />
      </div>
      <div class="mb-3">
        <label for="telefono" class="form-label">Teléfono</label>
        <input type="text" v-model="telefono" class="form-control" id="telefono" required />
      </div>
      <button type="submit" class="btn btn-primary">Guardar Proveedor</button>
      <router-link to="/proveedores" class="btn btn-outline-secondary ms-2">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      nombre: '',
      direccion: '',
      telefono: '',
    }
  },
  methods: {
    async guardarProveedor() {
      try {
        await axios.post('/api/proveedores', {
          nombre: this.nombre,
          direccion: this.direccion,
          telefono: this.telefono,
        })
        // Redirigir a la lista de proveedores
        this.$router.push('/proveedores')
      } catch (error) {
        console.error('Error al guardar el proveedor:', error)
      }
    },
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
