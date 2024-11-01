<template>
  <div class="container mt-4">
    <h1 class="text-center">Lista de Productos</h1>
    <div class="d-flex justify-content-end mb-3">
      <button
        type="button"
        class="btn btn-outline-success"
        @click="agregarProducto"
      >
        Agregar Producto
      </button>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Marca ID</th>
          <th>Categoría ID</th>
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
          <td>{{ producto.marca_id }}</td>
          <td>{{ producto.categoria_id }}</td>
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
    agregarProducto() {
      // Lógica para agregar un nuevo producto
    },
    // eslint-disable-next-line no-unused-vars
    editarProducto(id) {
      // Lógica para editar el producto con el ID proporcionado
    },
    // eslint-disable-next-line no-unused-vars
    eliminarProducto(id) {
      // Lógica para eliminar el producto con el ID proporcionado
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
