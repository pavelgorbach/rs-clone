import { useQuery } from '@tanstack/react-query'

import { fetchBoardById } from '@/api'

export default function useBoard(boardId?: string) {
  return useQuery({
    queryKey: ['board', boardId],
    queryFn: () => fetchBoardById(boardId),
    enabled: !!boardId
  })
}
