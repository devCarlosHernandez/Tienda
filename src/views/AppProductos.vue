<template>
  <div class="container mt-4">
    <h1 class="text-center">Lista de Productos</h1>
    <div class="d-flex justify-content-end mb-3">
      <router-link to="/agregar-producto" class="btn btn-outline-success">
        Agregar Producto
      </router-link>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Marca</th>
          <th>Categoría</th>
          <th>Proveedor</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos.data" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.marca.nombre }}</td>
          <td>{{ producto.categoria.nombre }}</td>
          <td>
            <ul>
              <li v-for="proveedor in producto.proveedores" :key="proveedor.id">
                {{ proveedor.nombre }}
              </li>
            </ul>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-warning"
              @click="editarProducto(producto.id)"
            >
              Editar
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="eliminarProducto(producto.id)"
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
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      productos: {
        data: [],
      },
    }
  },
  methods: {
    async fetchProductos(url = '/api/productos') {
      try {
        const response = await axios.get(url)
        this.productos = response.data
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    },
    editarProducto(id) {
      this.$router.push({ path: `/editar-producto/${id}` }) // Redirige al componente de edición con el ID
    },
    eliminarProducto(id) {
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
            const response = await axios.delete(`/api/productos/${id}`)
            Swal.fire('Eliminado', response.data.message, 'success')
            this.fetchProductos() // Actualiza la lista de productos
          } catch (error) {
            console.error('Error al eliminar el producto:', error)
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el producto.',
              'error',
            )
          }
        }
      })
    },
  },
  mounted() {
    this.fetchProductos()
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
