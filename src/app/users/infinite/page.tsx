'use client';

import Link from 'next/link';
import { useUsersInfinite } from '@/hooks/useUsersInfinite';

export default function UsersInfinitePage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useUsersInfinite();

  if (isLoading) {
    return <p className="p-5">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="p-5 text-red-500">Error cargando usuarios</p>;
  }

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Usuarios (Infinite Scroll)</h1>

      <ul className="space-y-2">
        {data?.pages.flat().map(user => (
          <li key={user.id} className="p-3 border rounded-md hover:bg-gray-100 transition">
            <Link href={`/users/${user.id}`} className="block">
              <p className="font-medium text-blue-600 hover:underline">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </Link>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
          </button>
        </div>
      )}

      {!hasNextPage && (
        <p className="text-center mt-4 text-gray-500">No hay más usuarios</p>
      )}
    </div>
  );
}
