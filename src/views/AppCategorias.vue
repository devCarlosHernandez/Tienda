<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Categorias</h2>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-outline-success">
        Agregar categoria
      </button>
    </div>
    <br />
    <div class="table-responsive">
      <table class="table table-bordered table-hover table-striped text-center">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <button type="button" class="btn btn-outline-warning">
                Editar
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-outline-danger">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import categoriaService from '../services/categoriaService'

export default {
  data() {
    return {
      categorias: [],
      form: { name: '' },
      isEditing: false,
      editingId: null,
    }
  },
  async created() {
    await this.fetchCategorias()
  },
  methods: {
    async fetchCategorias() {
      const response = await categoriaService.getCategorias()
      this.categorias = response.data
    },
    async handleSubmit() {
      if (this.isEditing) {
        await categoriaService.updateCategoria(this.editingId, this.form)
      } else {
        await categoriaService.createCategoria(this.form)
      }
      this.resetForm()
      await this.fetchCategorias()
    },
    editCategoria(categoria) {
      this.form = { ...categoria }
      this.editingId = categoria.id
      this.isEditing = true
    },
    async deleteCategoria(id) {
      await categoriaService.deleteCategoria(id)
      await this.fetchCategorias()
    },
    resetForm() {
      this.form = { name: '' }
      this.isEditing = false
      this.editingId = null
    },
  },
}
</script>
