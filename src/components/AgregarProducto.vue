<template>
  <div class="container mt-4">
    <h1 class="text-center">Agregar Producto</h1>
    <form @submit.prevent="guardarProducto">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre del Producto</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="producto.nombre"
          required
        />
      </div>

      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea
          class="form-control"
          id="descripcion"
          v-model="producto.descripcion"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="precio" class="form-label">Precio</label>
        <input
          type="number"
          class="form-control"
          id="precio"
          v-model="producto.precio"
          required
        />
      </div>

      <div class="mb-3">
        <label for="marca_id" class="form-label">Marca</label>
        <select
          class="form-select"
          id="marca_id"
          v-model="producto.marca_id"
          required
        >
          <option value="" disabled>Selecciona una marca</option>
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
            {{ marca.nombre }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="categoria_id" class="form-label">Categoría</label>
        <select
          class="form-select"
          id="categoria_id"
          v-model="producto.categoria_id"
          required
        >
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
        <button type="submit" class="btn btn-primary">Guardar Producto</button>
      </div>
    </form>
    <br /><br />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      producto: {
        nombre: '',
        descripcion: '',
        precio: '',
        marca_id: '',
        categoria_id: '',
        proveedor_id: [],
      },
      marcas: [],
      categorias: [],
      proveedores: [],
    }
  },
  methods: {
    async fetchMarcas() {
      try {
        const response = await axios.get('/api/marcas')
        this.marcas = response.data
      } catch (error) {
        console.error('Error al obtener marcas:', error)
      }
    },
    async fetchCategorias() {
      try {
        const response = await axios.get('/api/categorias')
        this.categorias = response.data
      } catch (error) {
        console.error('Error al obtener categorías:', error)
      }
    },
    async fetchProveedores() {
      try {
        const response = await axios.get('/api/proveedores')
        this.proveedores = response.data
      } catch (error) {
        console.error('Error al obtener proveedores:', error)
      }
    },
    async guardarProducto() {
      try {
        const response = await axios.post('/api/productos', this.producto)
        console.log('Producto guardado:', response.data)
        this.$router.push('/productos') // Redirigir a la lista de productos
      } catch (error) {
        console.error('Error al guardar el producto:', error)
      }
    },
  },
  mounted() {
    this.fetchMarcas()
    this.fetchCategorias()
    this.fetchProveedores()
  },
}
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
