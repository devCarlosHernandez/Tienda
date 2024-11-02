<template>
  <div class="container mt-4">
    <h1 class="text-center">Lista de Marcas</h1>
    <div class="d-flex justify-content-end mb-3">
      <router-link to="/agregar-marca" class="btn btn-outline-success">
        Agregar Marca
      </router-link>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="marca in marcas" :key="marca.id">
          <td>{{ marca.id }}</td>
          <td>{{ marca.nombre }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-warning"
              @click="editarMarca(marca.id)"
            >
              Editar
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="eliminarMarca(marca.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      marcas: [], // Inicializa como un array vacío
    }
  },
  methods: {
    async fetchMarcas(url = '/api/marcas') {
      try {
        const response = await axios.get(url)
        this.marcas = response.data // Asigna directamente la respuesta a 'marcas'
      } catch (error) {
        console.error('Error al obtener marcas:', error)
      }
    },
    // eslint-disable-next-line no-unused-vars
        editarMarca(id) {
        this.$router.push({ path: `/editar-marca/${id}` }); // Redirige al componente de edición con el ID
    },
    async eliminarMarca(id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(`/api/marcas/${id}`)
            Swal.fire('Eliminado', response.data.message, 'success')
            this.fetchMarcas() // Actualiza la lista de marcas
          } catch (error) {
            console.error('Error al eliminar la marca:', error.response.data)
            Swal.fire(
              'Error',
              error.response?.data?.message ||
                'Hubo un problema al eliminar la marca.',
              'error',
            )
          }
        }
      })
    },
  },
  mounted() {
    this.fetchMarcas() // Carga las marcas al montar el componente
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
