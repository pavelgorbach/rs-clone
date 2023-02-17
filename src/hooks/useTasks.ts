import { useQuery } from '@tanstack/react-query'

import { fetchTasksByBoardId } from '@/api'

export default function useTasks(boardId?: string) {
  return useQuery({
    queryKey: ['tasks', boardId],
    queryFn: () => fetchTasksByBoardId(boardId),
    enabled: !!boardId
  })
}
