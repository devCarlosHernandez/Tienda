<template>
  <div class="container mt-4">
    <h1 class="text-center">Lista de Proveedores</h1>
    <div class="d-flex justify-content-end mb-3">
      <router-link to="/agregar-proveedor" class="btn btn-outline-success">
        Agregar Proveedor
      </router-link>
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
        <tr v-for="proveedor in proveedores" :key="proveedor.id">
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
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      proveedores: [], // Inicializa como un array vacío
    }
  },
  methods: {
    async fetchProveedores(url = '/api/proveedores') {
      try {
        const response = await axios.get(url)
        this.proveedores = response.data // Asigna la respuesta directamente a 'proveedores'
      } catch (error) {
        console.error('Error al obtener proveedores:', error)
      }
    },
    agregarProveedor() {
      this.$router.push('/agregar-proveedor')
    },
    // eslint-disable-next-line no-unused-vars
    editarProveedor(id) {
      this.$router.push({ path: `/editar-proveedor/${id}` });
    },
    async eliminarProveedor(id) {
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
            const response = await axios.delete(`/api/proveedores/${id}`)
            Swal.fire(
              'Eliminado',
              response.data.message || 'Proveedor eliminado correctamente.',
              'success',
            )
            this.fetchProveedores() // Actualiza la lista de proveedores
          } catch (error) {
            console.error('Error al eliminar el proveedor:', error)
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el proveedor.',
              'error',
            )
          }
        }
      })
    },
  },
  mounted() {
    this.fetchProveedores() // Carga los proveedores al montar el componente
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
