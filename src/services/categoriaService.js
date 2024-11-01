import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
})

export default {
  getCategorias() {
    return apiClient.get('/categorias')
  },
  getCategoria(id) {
    return apiClient.get(`/categorias/${id}`)
  },
  createCategoria(categoria) {
    return apiClient.post('/categorias', categoria)
  },
  updateCategoria(id, categoria) {
    return apiClient.put(`/categorias/${id}`, categoria)
  },
  deleteCategoria(id) {
    return apiClient.delete(`/categorias/${id}`)
  },
}
