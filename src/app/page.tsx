import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido!</h1>
      <p className="text-lg mb-6">Aplicación de Gestión de Tareas en Tiempo Real</p>
      <Link href="/tasks" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
        Gestion de Tareas
      </Link>
    </main>
  );
}
