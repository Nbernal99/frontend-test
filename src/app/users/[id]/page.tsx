"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

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
    throw new Error("Error al cargar el usuario");
  }
  return res.json();
}

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  if (!id || Array.isArray(id)) {
    return <p className="p-6 text-red-500">ID inválido</p>;
  }

  const userId = Array.isArray(id) ? id[0] : id;

  const { data: user, isLoading, error } = useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) {
    return <p className="p-6">Cargando usuario...</p>;
  }

  if (error || !user) {
    return <p className="p-6 text-red-500">Error cargando usuario</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
          >
            Volver
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="font-medium">{user.phone}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Website</p>
              <p className="font-medium">{user.website}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Compañía</p>
              <p className="font-medium">{user.company.name}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="font-medium">
                {user.address.street}, {user.address.suite}
              </p>
              <p className="text-sm text-gray-600">
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
