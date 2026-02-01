'use client';

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export function useUsersInfinite() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (isFetching || !hasNextPage) return;

    setIsFetching(true);
    try {
      const res = await fetch(`/api/users?page=${page}`);
      if (!res.ok) throw new Error("Error cargando usuarios");

      const data = await res.json();

      if (data.length === 0) {
        setHasNextPage(false);
      } else {
        setUsers((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1);
      }
    } catch {
      setError("Error cargando usuarios");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    fetchNextPage: fetchUsers,
    hasNextPage,
    isFetching,
    error,
  };
}
