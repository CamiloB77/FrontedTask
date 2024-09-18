'use client'; // Asegúrate de marcar esto como un componente de cliente

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/api/auth/register', { name, username, email, password });
      router.push('/login'); // Redirige al usuario a la página de inicio de sesión después del registro
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="text"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}
