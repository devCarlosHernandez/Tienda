<template>
  <div class="container mt-4">
    <h1 class="text-center">Editar Producto</h1>

    <form @submit.prevent="actualizarProducto">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre del Producto</label>
        <input
          type="text"
          class="form-control"
          v-model="producto.nombre"
          required
        />
      </div>

      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea
          class="form-control"
          v-model="producto.descripcion"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="precio" class="form-label">Precio</label>
        <input
          type="number"
          class="form-control"
          v-model="producto.precio"
          required
        />
      </div>

      <div class="mb-3">
        <label for="marca_id" class="form-label">Marca</label>
        <select class="form-select" v-model="producto.marca_id" required>
          <option value="" disabled>Selecciona una marca</option>
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
            {{ marca.nombre }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="categoria_id" class="form-label">Categoría</label>
        <select class="form-select" v-model="producto.categoria_id" required>
          <option value="" disabled>Selecciona una categoría</option>
          <option
            v-for="categoria in categorias"
            :key="categoria.id"
            :value="categoria.id"
          >
            {{ categoria.nombre }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Proveedores:</label>
        <div
          v-for="proveedor in proveedores"
          :key="proveedor.id"
          class="form-check"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :id="'proveedor_' + proveedor.id"
            :value="proveedor.id"
            v-model="producto.proveedor_id"
          />
          <label class="form-check-label" :for="'proveedor_' + proveedor.id">
            {{ proveedor.nombre }}
          </label>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        <router-link to="/productos" class="btn btn-outline-secondary ms-2"
          >Cancelar</router-link
        >
      </div>
    </form>
    <br /><br />
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      producto: {
        id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        marca_id: '',
        categoria_id: '',
        proveedor_id: [], // Para los proveedores seleccionados
      },
      marcas: [], // Para las marcas disponibles
      categorias: [], // Para las categorías disponibles
      proveedores: [], // Para los proveedores disponibles
    }
  },
  methods: {
    async fetchProducto() {
      const id = this.$route.params.id // Obtener el ID desde la ruta
      try {
        const response = await axios.get(`/api/productos/${id}`)
        this.producto = response.data // Asigna la respuesta a 'producto'
        console.log(this.producto)
      } catch (error) {
        console.error('Error al obtener el producto:', error)
        Swal.fire('Error', 'No se pudo cargar el producto.', 'error')
      }
    },

    async fetchMarcas() {
      try {
        const response = await axios.get('/api/marcas')
        this.marcas = response.data // Asigna la respuesta a 'marcas'
      } catch (error) {
        console.error('Error al obtener marcas:', error)
      }
    },

    async fetchCategorias() {
      try {
        const response = await axios.get('/api/categorias')
        this.categorias = response.data // Asigna la respuesta a 'categorias'
      } catch (error) {
        console.error('Error al obtener categorías:', error)
      }
    },

    async fetchProveedores() {
      try {
        const response = await axios.get('/api/proveedores')
        this.proveedores = response.data // Asigna la respuesta a 'proveedores'
      } catch (error) {
        console.error('Error al obtener proveedores:', error)
      }
    },

    async actualizarProducto() {
      const id = this.$route.params.id // Obtener el ID desde la ruta
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.put(`/api/productos/${id}`, this.producto)
        Swal.fire(
          'Actualizado',
          'El producto ha sido actualizado con éxito.',
          'success',
        )
        this.$router.push('/productos') // Redirige a la lista de productos
      } catch (error) {
        console.error('Error al actualizar el producto:', error)
        Swal.fire(
          'Error',
          'Hubo un problema al actualizar el producto.',
          'error',
        )
      }
    },
  },
  mounted() {
    this.fetchProducto() // Carga el producto al montar el componente
    this.fetchMarcas() // Carga las marcas disponibles
    this.fetchCategorias() // Carga las categorías disponibles
    this.fetchProveedores() // Carga los proveedores disponibles
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
