// apiService.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Reemplaza con la URL de tu API Laravel
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para establecer el token JWT en las cabeceras de Axios
export function setAuthToken(token) {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
}

export default apiClient;
