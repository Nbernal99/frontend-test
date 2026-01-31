import { useInfiniteQuery } from '@tanstack/react-query';

export type User = {
  id: number;
  name: string;
  email: string;
};

const USERS_PER_PAGE = 5;

export function useUsersInfinite() {
  return useInfiniteQuery<User[], Error>({
    queryKey: ['users-infinite'],
    initialPageParam: 0,

    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;

      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Error al traer usuarios');

      const users: User[] = await res.json();

      const start = page * USERS_PER_PAGE;
      const end = start + USERS_PER_PAGE;

      return users.slice(start, end);
    },

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < USERS_PER_PAGE) return undefined;
      return allPages.length;
    },
  });
}
