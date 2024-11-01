<template>
  <div class="container mt-4">
    <h1 class="text-center">Lista de Proveedores</h1>
    <div class="d-flex justify-content-end mb-3">
      <button
        type="button"
        class="btn btn-outline-success"
        @click="agregarProveedor"
      >
        Agregar Proveedor
      </button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proveedor in proveedores.data" :key="proveedor.id">
          <td>{{ proveedor.id }}</td>
          <td>{{ proveedor.nombre }}</td>
          <td>{{ proveedor.direccion }}</td>
          <td>{{ proveedor.telefono }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-warning"
              @click="editarProveedor(proveedor.id)"
            >
              Editar
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="eliminarProveedor(proveedor.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      proveedores: {
        data: [],
      },
    }
  },
  methods: {
    async fetchProveedores(url = '/api/proveedores') {
      try {
        const response = await axios.get(url)
        this.proveedores = response.data
      } catch (error) {
        console.error('Error al obtener proveedores:', error)
      }
    },
    agregarProveedor() {
      // Lógica para agregar un nuevo proveedor
    },
    // eslint-disable-next-line no-unused-vars
    editarProveedor(id) {
      // Lógica para editar el proveedor con el ID proporcionado
    },
    // eslint-disable-next-line no-unused-vars
    eliminarProveedor(id) {
      // Lógica para eliminar el proveedor con el ID proporcionado
    },
  },
  mounted() {
    this.fetchProveedores()
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
