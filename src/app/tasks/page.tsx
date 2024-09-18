'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const TasksPage = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5555/api/tasks/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Asegúrate de que los datos son un array
        if (response.data.success && Array.isArray(response.data.data)) {
          setTasks(response.data.data);
        } else {
          setError('Failed to fetch tasks or data format is incorrect');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Error fetching tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5555/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Tasks</h1>
      <Link href="/task/new" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6">
          Create New Task
      </Link>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available</p>
      ) : (
        <ul className="space-y-6">
          {tasks.map(task => (
            <li key={task._id} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h2>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <p className="text-sm text-gray-500">User: <span className="font-medium">{task.userName}</span></p>
                <p className="text-sm text-gray-500">State: <span className={`font-medium ${task.state === 'Abierta' ? 'text-green-500' : task.state === 'En progreso' ? 'text-yellow-500' : 'text-red-500'}`}>{task.state}</span></p>
              </div>
              <div className="flex space-x-4">
                <Link className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" href={`/task/edit/${task._id}`}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksPage;
