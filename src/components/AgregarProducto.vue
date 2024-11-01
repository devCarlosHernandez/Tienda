<template>
  <div class="container mt-4">
    <h1 class="text-center">Agregar Producto</h1>
    <form @submit.prevent="guardarProducto">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre del Producto</label>
        <input type="text" class="form-control" id="nombre" v-model="producto.nombre" required />
      </div>

      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea class="form-control" id="descripcion" v-model="producto.descripcion" required></textarea>
      </div>

      <div class="mb-3">
        <label for="precio" class="form-label">Precio</label>
        <input type="number" class="form-control" id="precio" v-model="producto.precio" required />
      </div>

      <div class="mb-3">
        <label for="marca_id" class="form-label">Marca</label>
        <select class="form-select" id="marca_id" v-model="producto.marca_id" required>
          <option value="" disabled>Selecciona una marca</option>
          <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Guardar Producto</button>
    </form>
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
        marca_id: ''
      },
      marcas: [], // Array para almacenar las marcas
    }
  },
  methods: {
    async fetchMarcas(url = '/api/marcas') {
      try {
        const response = await axios.get(url)
        this.marcas = response.data // Asigna la respuesta a 'marcas'
      } catch (error) {
        console.error('Error al obtener marcas:', error)
      }
    },
    async guardarProducto() {
      try {
        // Enviar los datos del producto al backend
        const response = await axios.post('/api/productos', this.producto)
        console.log('Producto guardado:', response.data)
        // Aquí puedes agregar lógica para manejar la respuesta después de guardar el producto
      } catch (error) {
        console.error('Error al guardar el producto:', error)
      }
    }
  },
  mounted() {
    this.fetchMarcas() // Cargar marcas al montar el componente
  },
}
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>
