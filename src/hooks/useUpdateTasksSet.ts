import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateTasksSet } from '@/api'
import { Task } from '@/api/types'

export default function useUpdateTasksSet(boardId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Task[]) => {
      const toServer = data.map(({ _id, order, columnId }) => ({ _id, order, columnId }))
      return updateTasksSet(toServer)
    },
    onMutate: async (newTasks: Task[]) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', boardId] })

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', boardId])

      if (previousTasks) {
        const ids = newTasks.map((t) => t._id)
        const rest = previousTasks.filter((task) => !ids.includes(task._id))
        queryClient.setQueryData<Task[]>(['tasks', boardId], [...newTasks, ...rest])
      }

      return { previousTasks }
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(['tasks', boardId], context.previousTasks)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}
