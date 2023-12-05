import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      <h1 className="text-6xl font-extrabold text-gray-800 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Página no encontrada</p>

      <Link
        to="/"
        className="text-blue-500 hover:underline focus:outline-none focus:ring focus:border-blue-300"
      >
        Ir a la página principal
      </Link>
    </div>
  );
}

export default NotFoundPage;