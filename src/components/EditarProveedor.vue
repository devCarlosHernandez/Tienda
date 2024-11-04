<template>
  <div class="container mt-4">
    <h1 class="text-center">Editar Proveedor</h1>
    <form @submit.prevent="actualizarProveedor">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="proveedor.nombre"
          required
        />
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección</label>
        <input
          type="text"
          class="form-control"
          id="direccion"
          v-model="proveedor.direccion"
          required
        />
      </div>
      <div class="mb-3">
        <label for="telefono" class="form-label">Teléfono</label>
        <input
          type="text"
          class="form-control"
          id="telefono"
          v-model="proveedor.telefono"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Actualizar Proveedor</button>
      <router-link to="/proveedores" class="btn btn-outline-secondary ms-2">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      proveedor: { nombre: '', direccion: '', telefono: '' },
    };
  },
  methods: {
    async fetchProveedor() {
      const id = this.$route.params.id; // Obtener el ID desde la ruta
      try {
        const response = await axios.get(`/api/proveedor/${id}`);
        this.proveedor = response.data; // Asigna la respuesta a 'proveedor'
      } catch (error) {
        console.error('Error al obtener el proveedor:', error);
        Swal.fire('Error', 'No se pudo cargar el proveedor.', 'error');
      }
    },
    async actualizarProveedor() {
      const id = this.$route.params.id; // Obtener el ID desde la ruta
      try {
        const response = await axios.put(`/api/proveedor/${id}`, {
          nombre: this.proveedor.nombre,
          direccion: this.proveedor.direccion,
          telefono: this.proveedor.telefono,
        });

        // Verifica si el estado de respuesta es exitoso
        if (response.status === 200) {
          Swal.fire('Actualizado', response.data.message || 'El proveedor ha sido actualizado con éxito.', 'success');
          this.$router.push('/proveedores'); // Redirige a la lista de proveedores
        } else {
          Swal.fire('Error', 'Hubo un problema al actualizar el proveedor.', 'error');
        }
      } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        const message = error.response?.data?.message || 'No se pudo actualizar el proveedor. Verifica los datos enviados.';
        Swal.fire('Error', message, 'error');
      }
    },
  },
  mounted() {
    this.fetchProveedor(); // Carga el proveedor al montar el componente
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
