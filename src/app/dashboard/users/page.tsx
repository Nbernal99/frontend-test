"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const USERS_PER_PAGE = 5;

export default function UsersPage() {
  const [view, setView] = useState<"manual" | "all">("manual");
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [errorAll, setErrorAll] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Error al traer usuarios");
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Hubo un error cargando usuarios");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    setLoadingAll(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Error al traer usuarios");
      const data = await res.json();
      setAllUsers(data);
    } catch {
      setErrorAll("Hubo un error cargando usuarios");
    } finally {
      setLoadingAll(false);
    }
  };

  useEffect(() => {
    if (view === "manual" && users.length === 0 && !loading && !error) {
      fetchUsers();
    }
  }, [view]);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const usersToShow = users.slice(startIndex, endIndex);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  return (
    <div className="flex-1 h-full bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold mb-6">Usuarios</h1>

        <div className="bg-white rounded-lg shadow p-5">
          {view === "manual" && (
            <>
              {loading ? (
                <p className="p-5">Cargando usuarios...</p>
              ) : error ? (
                <p className="p-5 text-red-500">{error}</p>
              ) : (
                <>
                  <ul className="divide-y">
                    {usersToShow.map(user => (
                      <li
                        key={user.id}
                        className="py-3 px-2 hover:bg-gray-50 transition rounded-md"
                      >
                        <Link href={`/users/${user.id}`} className="block">
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                    >
                      Anterior
                    </button>

                    <span className="text-sm text-gray-600">
                      Página {currentPage} de {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                    >
                      Siguiente
                    </button>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => {
                        setView("all");
                        fetchAllUsers();
                      }}
                      className="text-sm text-blue-600 hover:underline transition"
                    >
                      Mostrar todos
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {view === "all" && (
            <>
              {loadingAll ? (
                <p className="p-5">Cargando usuarios...</p>
              ) : errorAll ? (
                <p className="p-5 text-red-500">{errorAll}</p>
              ) : (
                <>
                  <ul className="divide-y">
                    {allUsers.map(user => (
                      <li
                        key={user.id}
                        className="py-3 px-2 hover:bg-gray-50 transition rounded-md"
                      >
                        <Link href={`/users/${user.id}`} className="block">
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setView("manual")}
                      className="text-sm text-blue-600 hover:underline transition"
                    >
                      Mostrar paginado
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
