<template>
  <div class="container mt-4">
    <h1 class="text-center">Lista de Categorías</h1>
    <div class="d-flex justify-content-end mb-3">
      <router-link to="/agregar-categoria" class="btn btn-outline-success">
        Agregar categoría
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
        <tr v-for="categoria in categorias.data" :key="categoria.id">
          <td>{{ categoria.id }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>{{ categoria.descripcion }}</td>
          <td>
            <button type="button" class="btn btn-outline-warning">
              Editar
            </button>
          </td>
          <td>
            <button type="button" class="btn btn-outline-danger">
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
      categorias: {
        data: [],
      },
    }
  },
  methods: {
    async fetchCategorias(url = '/api/categorias') {
      try {
        const response = await axios.get(url)
        this.categorias = response.data
      } catch (error) {
        console.error('Error al obtener categorías:', error)
      }
    },
  },
  mounted() {
    this.fetchCategorias()
  },
}
</script>
