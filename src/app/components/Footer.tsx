"use client";

export default function Footer() {
  return (
    <footer className="bg-blue-600 p-4 mt-10">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} Task Manager. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
