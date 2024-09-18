import '../styles/globals.css';  // Importa Tailwind CSS
import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* Navbar incluido en todas las páginas */}
        <Navbar />

        {/* El contenido principal de la página */}
        <main className="min-h-screen">{children}</main>

        {/* Footer incluido en todas las páginas */}
        <Footer />
      </body>
    </html>
  );
}
