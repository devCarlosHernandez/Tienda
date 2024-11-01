<template>
  <div class="container mt-4">
    <h1 class="text-center">Lista de Marcas</h1>
    <div class="d-flex justify-content-end mb-3">
      <button
        type="button"
        class="btn btn-outline-success"
        @click="agregarMarca"
      >
        Agregar Marca
      </button>
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
        <tr v-for="marca in marcas.data" :key="marca.id">
          <td>{{ marca.id }}</td>
          <td>{{ marca.nombre }}</td>
          <td>
            <button type="button" class="btn btn-outline-warning" @click="editarMarca(marca.id)">
              Editar
            </button>
          </td>
          <td>
            <button type="button" class="btn btn-outline-danger" @click="eliminarMarca(marca.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      marcas: {
        data: [],
      },
    }
  },
  methods: {
    async fetchMarcas(url = '/api/marcas') {
      try {
        const response = await axios.get(url)
        this.marcas = response.data
      } catch (error) {
        console.error('Error al obtener marcas:', error)
      }
    },
    agregarMarca() {
      // Lógica para agregar una nueva marca
    },
    // eslint-disable-next-line no-unused-vars
    editarMarca(id) {
      // Lógica para editar la marca con el ID proporcionado
    },
    // eslint-disable-next-line no-unused-vars
    eliminarMarca(id) {
      // Lógica para eliminar la marca con el ID proporcionado
    },
  },
  mounted() {
    this.fetchMarcas()
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
