<template>
  <div class="container mt-4">
    <h1 class="text-center">Lista de Categorías</h1>
    <div class="d-flex justify-content-end mb-3">
      <router-link to="/agregar-categoria" class="btn btn-outline-success">
        Agregar Categoría
      </router-link>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>{{ categoria.id }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>{{ categoria.descripcion }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-warning"
              @click="editarCategoria(categoria.id)"
            >
              Editar
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="eliminarCategoria(categoria.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <br /><br />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      categorias: [], // Inicializa como un array vacío
    }
  },
  methods: {
    async fetchCategorias(url = '/api/categorias') {
      try {
        const response = await axios.get(url)
        this.categorias = response.data // Asigna la respuesta a 'categorias'
      } catch (error) {
        console.error('Error al obtener categorías:', error)
      }
    },
    // eslint-disable-next-line no-unused-vars
    editarCategoria(id) {
      // Lógica para editar la categoría con el ID proporcionado
    },
    // eslint-disable-next-line no-unused-vars
    eliminarCategoria(id) {
      // Lógica para eliminar la categoría con el ID proporcionado
    },
  },
  mounted() {
    this.fetchCategorias() // Carga las categorías al montar el componente
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
