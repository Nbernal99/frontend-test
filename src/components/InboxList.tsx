"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
};

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Error cargando usuarios");
  return res.json();
}

export default function InboxList() {
  const router = useRouter();

  const { data: users, isLoading, error } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <p className="p-4">Cargando...</p>;
  if (error || !users) return <p className="p-4 text-red-500">Error cargando usuarios</p>;

  return (
    <aside className="w-72 border-r bg-white overflow-y-auto">
      <div className="p-4 font-semibold border-b">Chat</div>

      <ul>
        {users.map(user => (
          <li
            key={user.id}
            onClick={() => router.push(`/dashboard/inbox?userId=${user.id}`)}
            className="flex justify-between items-center p-3 border-b cursor-pointer hover:bg-gray-100 transition"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <Link
              href={`/users/${user.id}`}
              onClick={e => e.stopPropagation()}
              className="text-gray-500 hover:text-blue-600 transition"
            >
              <Eye size={18} />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
