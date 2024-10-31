// src/services/auth.js
import axios from 'axios'

// Configura axios con credenciales y URL base desde el .env
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/api';

export const login = credentials => axios.post('/login', credentials)


const authToken = localStorage.getItem('token'); // O donde estés guardando el token

if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

export const getUser = async () => {
  try {
    const response = await axios.get('/api/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};


export const logout = () => axios.post('/logout')
