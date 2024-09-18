'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

const EditTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [state, setState] = useState('Abierta'); // Estado predeterminado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams(); // Obtiene el ID de la tarea desde la URL

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5555/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const task = response.data.data;
          setTitle(task.title);
          setDescription(task.description);
          setUserName(task.userName);
          setState(task.state);
        } else {
          setError('Failed to fetch task or data format is incorrect');
        }
      } catch (error) {
        console.error('Error fetching task:', error);
        setError('Error fetching task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5555/api/tasks/${id}`, {
        title,
        description,
        userName,
        state,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Error updating task');
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Task</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="userName">User Name</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="User Name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="state">State</label>
          <select
            id="state"
            value={state}
            onChange={e => setState(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Abierta">Abierta</option>
            <option value="En progreso">En progreso</option>
            <option value="Cerrada">Cerrada</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTaskPage;
