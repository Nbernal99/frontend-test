import { useQuery } from '@tanstack/react-query';

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};

export function useUser(id: number) {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      if (!res.ok) {
        throw new Error('Error cargando usuario');
      }

      return res.json();
    },
    enabled: !!id,
  });
}
