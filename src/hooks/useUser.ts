import { useQuery } from '@tanstack/react-query'

import { fetchUser } from '@/api'

export default function useUser(userId?: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId
  })
}
