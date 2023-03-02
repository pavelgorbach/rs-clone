import { useQuery } from '@tanstack/react-query'

import { fetchTasksByUserId } from '@/api'

export default function useUserTasks(userId?: string) {
  return useQuery({
    queryKey: ['my-tasks', userId],
    queryFn: () => fetchTasksByUserId(userId),
    enabled: !!userId
  })
}
