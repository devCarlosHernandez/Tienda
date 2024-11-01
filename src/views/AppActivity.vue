<template>
  <div class="container mt-4">
    <h1 class="text-center">Registro de Actividades</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre del Log</th>
          <th>Descripción</th>
          <th>ID del Sujeto</th>
          <th>ID del Causante</th>
          <th>Fecha de Creación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in activityLogs.data" :key="log.id">
          <td>{{ log.id }}</td>
          <td>{{ log.log_name }}</td>
          <td>{{ log.description }}</td>
          <td>{{ log.subject_id }}</td>
          <td>{{ log.causer_id }}</td>
          <td>{{ new Date(log.created_at).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      activityLogs: {
        data: [],
      },
    }
  },
  methods: {
    async fetchActivityLogs(url = '/api/activity') {
      try {
        const response = await axios.get(url)
        this.activityLogs = response.data
      } catch (error) {
        console.error('Error al obtener el registro de actividades:', error)
      }
    },
  },
  mounted() {
    this.fetchActivityLogs()
  },
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
