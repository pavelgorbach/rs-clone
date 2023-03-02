import { useQuery } from '@tanstack/react-query'

import { fetchColumnsByBoardId } from '@/api'

export default function useColumns(boardId?: string) {
  return useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => fetchColumnsByBoardId(boardId),
    enabled: !!boardId
  })
}
