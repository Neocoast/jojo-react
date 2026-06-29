import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg">Lamm! The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-blue-500 underline hover:text-blue-700">
        Go back home
      </Link>
    </div>
  );
}
