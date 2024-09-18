"use client";

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold cursor-pointer" onClick={() => router.push('/tasks')}>
          Task Manager
        </div>
        <div>
          <button 
            onClick={handleLogout}
            className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-200 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
