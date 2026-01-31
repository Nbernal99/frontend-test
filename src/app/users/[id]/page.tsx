'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
};

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) {
    throw new Error('Error al cargar el usuario');
  }
  return res.json();
}

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  if (!id || Array.isArray(id)) return <p className="p-5 text-red-500">ID inválido</p>;

  const userId = Array.isArray(id) ? id[0] : id;

  const { data: user, isLoading, error } = useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) {
    return <p className="p-5">Cargando usuario...</p>;
  }

  if (error || !user) {
    return <p className="p-5 text-red-500">Error cargando usuario</p>;
  }

  return (
    <div className="p-5 max-w-xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
      >
        Volver
      </button>

      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>

      <div className="space-y-2 text-gray-700 mb-4">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Compañía:</strong> {user.company.name}</p>
        <p>
          <strong>Dirección:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
        </p>
      </div>

      <Link
        href={`/chat?to=${user.id}&name=${encodeURIComponent(user.name)}`}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Enviar Mensaje
      </Link>
    </div>
  );
}
