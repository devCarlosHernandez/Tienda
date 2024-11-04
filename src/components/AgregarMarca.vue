<template>
  <div class="container mt-4">
    <h1>Agregar Marca</h1>
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
      <button type="submit" class="btn btn-primary">Agregar</button>
      <button type="button" class="btn btn-secondary" @click="cancelar">
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      nombre: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        await axios.post('/api/marcas', {
          nombre: this.nombre,
        });

        // Muestra una alerta de éxito con SweetAlert
        Swal.fire({
          title: 'Marca Agregada',
          text: 'La marca se ha agregado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirige a la lista de marcas después de confirmar la alerta
          this.$router.push({ name: 'marcas' });
        });
      } catch (error) {
        console.error('Error al agregar marca:', error);
        // Mostrar un mensaje de error con SweetAlert
        Swal.fire({
          title: 'Error',
          text: 'No se pudo agregar la marca.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
    cancelar() {
      this.$router.push({ name: 'marcas' }); // Redirigir a la lista si se cancela
    },
  },
};

</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
