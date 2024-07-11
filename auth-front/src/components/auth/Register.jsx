import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../apiService';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: password
      });

      console.log('Registration successful:', response.data);
      setRegistrationSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Error al registrar. Verifica tus datos.');
      } else {
        setError('Error de conexión. Inténtalo de nuevo más tarde.');
      }
      console.error('Registration error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">Register</h2>
        {registrationSuccess && (
          <div className="text-green-500 text-sm mb-4 text-center">
            ¡Registro exitoso! Serás redirigido al inicio de sesión.
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Ingresa tu Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Ingresa tu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
          >
            Registrarme
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/auth/login" className="text-blue-500 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
