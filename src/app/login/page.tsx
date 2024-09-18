'use client'; // Next.js 13 para componentes de cliente

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      debugger;
      const response = await axios.post('http://localhost:5555/api/auth/login', { email, password });
      const { access_token } = response.data.data;

      // Decodifica el token para obtener el userId
      const decodedToken = JSON.parse(atob(access_token.split('.')[1]));
      const userId = decodedToken.sub; // `sub` contiene el userId en el JWT
  
      // Guarda el token y el userId en el localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('userId', userId);
  
      router.push('/tasks');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
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
          Login
        </button>
      </form>
    </div>
  );
}
