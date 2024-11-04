<template>
  <div class="container mt-4">
    <h1 class="text-center">Editar Categoría</h1>
    <form @submit.prevent="actualizarCategoria">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="categoria.nombre"
          required
        />
      </div>
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <input
          type="text"
          class="form-control"
          id="descripcion"
          v-model="categoria.descripcion"
          required
        />
      </div>
      <button type="submit" class="btn btn-outline-success">Actualizar</button>
      <router-link to="/categorias" class="btn btn-outline-secondary">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      categoria: { nombre: '', descripcion: '' }, // Inicializa la categoría con nombre y descripción
    }
  },
  methods: {
    async fetchCategoria() {
      const id = this.$route.params.id // Obtener el ID desde la ruta
      console.log(`Cargando categoría con ID: ${id}`) // Verificación
      try {
        const response = await axios.get(`/api/categorias/${id}`)
        this.categoria = response.data // Asigna la respuesta a 'categoria'
        console.log('Categoría cargada:', this.categoria) // Verificación
      } catch (error) {
        console.error('Error al obtener la categoría:', error)
        Swal.fire('Error', 'No se pudo cargar la categoría.', 'error')
      }
    },
    async actualizarCategoria() {
      const id = this.$route.params.id // Obtener el ID desde la ruta
      try {
        const response = await axios.put(`/api/categorias/${id}`, {
          nombre: this.categoria.nombre,
          descripcion: this.categoria.descripcion
        })

        // Verifica si el estado de respuesta es exitoso
        if (response.status === 200) {
          Swal.fire(
            'Actualizado',
            response.data.message || 'La categoría ha sido actualizada con éxito.',
            'success',
          )
          this.$router.push('/categorias') // Redirige a la lista de categorías
        } else {
          Swal.fire('Error', 'Hubo un problema al actualizar la categoría.', 'error')
        }
      } catch (error) {
        console.error('Error al actualizar la categoría:', error)
        const message =
          error.response?.data?.message ||
          'No se pudo actualizar la categoría. Verifica los datos enviados.'
        Swal.fire('Error', message, 'error')
      }
    },
  },
  mounted() {
    this.fetchCategoria() // Carga la categoría al montar el componente
  },
}
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
