'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NewTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [state, setState] = useState('Abierta'); // Estado predeterminado
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Obteniendo el userId del almacenamiento
      await axios.post('http://localhost:5555/api/tasks/', {
        title,
        description,
        userId, // Asumiendo que obtienes el userId del localStorage o sesión
        userName,
        state,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Abierta">Abierta</option>
              <option value="En progreso">En progreso</option>
              <option value="Cerrada">Cerrada</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTaskPage;
