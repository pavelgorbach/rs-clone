import { useQuery } from '@tanstack/react-query'

import { fetchUserBoards } from '@/api'

export default function useBoards(userId?: string) {
  return useQuery({
    queryKey: ['boards', userId],
    queryFn: () => fetchUserBoards(userId),
    enabled: !!userId
  })
}
