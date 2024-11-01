<template>
  <div class="container mt-4">
    <h1>Agregar Categoría</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="nombre"
          required
        />
      </div>
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea
          class="form-control"
          id="descripcion"
          v-model="descripcion"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Agregar</button>
      <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      nombre: '',
      descripcion: '',
    }
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('/api/categorias', {
          nombre: this.nombre,
          descripcion: this.descripcion,
        });

        // Redirige a la lista de categorías después de agregar
        this.$router.push({ name: 'categorias' });
      } catch (error) {
        console.error('Error al agregar categoría:', error);
        // Aquí podrías mostrar un mensaje de error si lo deseas
      }
    },
    cancelar() {
      this.$router.push({ name: 'categorias' }); // Redirigir a la lista si se cancela
    }
  }
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
