import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para redireccionar

import apiClient, { setAuthToken } from '../../apiService';

export default function Inicio() {
  const navigate = useNavigate();  // Obtiene la función de navegación

  const handleLogout = async () => {
    try {
      const response = await apiClient.post('/logout');
      console.log(response.data.message);
      setAuthToken(null); // Elimina el token JWT de las cabeceras
      navigate('/auth/login');  // Redirige al usuario al login después del cierre de sesión
    } catch (error) {
      console.error('Logout error:', error);
      // Manejar errores de cierre de sesión si es necesario
    }
  };

  return (
    <nav className='flex justify-between h-10 w-screen border-b-indigo-300'>
      <h1>Digital Market</h1>

      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
