<template>
  <div class="container mt-4">
    <h1 class="text-center">Editar Marca</h1>
    <form @submit.prevent="actualizarMarca">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="marca.nombre"
          required
        />
      </div>
      <button type="submit" class="btn btn-outline-success">Actualizar</button>
      <router-link to="/marcas" class="btn btn-outline-secondary">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      marca: { nombre: '' }, // Solo necesita el nombre
    };
  },
  methods: {
      async fetchMarca() {
        const id = this.$route.params.id; // Obtener el ID desde la ruta
        try {
          const response = await axios.get(`/api/marcas/${id}`);
          this.marca = response.data; // Asigna la respuesta a 'marca'
        } catch (error) {
          console.error('Error al obtener la marca:', error);
          Swal.fire('Error', 'No se pudo cargar la marca.', 'error');
        }
      },
      async actualizarMarca() {
        const id = this.$route.params.id; // Obtener el ID desde la ruta
        try {
          const response = await axios.put(`/api/marcas/${id}`, { nombre: this.marca.nombre });

          // Verifica si el estado de respuesta es exitoso
          if (response.status === 200) {
            Swal.fire('Actualizado', response.data.message || 'La marca ha sido actualizada con éxito.', 'success');
            this.$router.push('/marcas'); // Redirige a la lista de marcas
          } else {
            Swal.fire('Error', 'Hubo un problema al actualizar la marca.', 'error');
          }
        } catch (error) {
          console.error('Error al actualizar la marca:', error);
          const message = error.response?.data?.message || 'No se pudo actualizar la marca. Verifica los datos enviados.';
          Swal.fire('Error', message, 'error');
        }
      }
  },
  mounted() {
    this.fetchMarca(); // Carga la marca al montar el componente
  },
};
</script>


<style scoped>
/* Estilos personalizados si es necesario */
</style>
