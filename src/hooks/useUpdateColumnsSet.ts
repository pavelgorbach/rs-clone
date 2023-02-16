import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateColumnsSet } from '@/api'
import { Column } from '@/api/types'

export default function useUpdateColumnsSet(boardId: string, cb?: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Column[]) => {
      const toServer = data.map(({ _id, order }) => ({ _id, order }))
      return updateColumnsSet(toServer)
    },
    onMutate: async (newColumns: Column[]) => {
      await queryClient.cancelQueries({ queryKey: ['columns', boardId] })

      const previousColumns = queryClient.getQueryData<Column[]>(['columns', boardId])

      if (previousColumns) {
        queryClient.setQueryData<Column[]>(['columns', boardId], newColumns)
      }

      return { previousColumns }
    },
    onError: (err, variables, context) => {
      if (context?.previousColumns) {
        queryClient.setQueryData<Column[]>(['columns', boardId], context.previousColumns)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] })

      if (cb) cb()
    }
  })
}
