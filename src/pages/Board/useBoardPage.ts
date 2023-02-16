import { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { OnDragEndResponder } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Board, Column, Task } from '@/api/types'
import {
  fetchBoardById,
  fetchColumnsByBoardId,
  createColumn,
  patchColumn,
  deleteColumn,
  updateColumnsSet,
  fetchTasksByBoardId,
  createTask,
  deleteTask,
  patchTask
} from '@/api'
import useAuthStore from '@/hooks/useAuthStore'
import useModal from '@/hooks/useModal'

type Modals =
  | { name: 'add-column'; data: { boardId: string } }
  | { name: 'edit-column'; data: Column }
  | { name: 'delete-column'; data: { boardId: string; columnId: string } }
  | {
      name: 'add-task'
      data: { userId: string; boardId: string; columnId: string; order: number }
    }
  | { name: 'edit-task'; data: Task }
  | { name: 'delete-task'; data: { columnId: string; taskId: string } }

export default function useBoardPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { id: boardId } = useParams()

  const { isAuthenticated, userId } = useAuthStore()
  const { modal, openModal, closeModal } = useModal<Modals>()

  const boarQuery = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => fetchBoardById(boardId),
    enabled: isAuthenticated && !!boardId
  })

  const columnsQuery = useQuery({
    queryKey: ['columns', boardId],
    queryFn: () => fetchColumnsByBoardId(boardId),
    enabled: isAuthenticated && !!boardId
  })

  const tasksQuery = useQuery({
    queryKey: ['tasks', boardId],
    queryFn: () => fetchTasksByBoardId(boardId),
    enabled: isAuthenticated && !!boardId
  })

  const { mutate: addColumn } = useMutation({
    mutationFn: ({ boardId, title, order }: { boardId: string; title: string; order: number }) => {
      return createColumn(boardId, { order, title })
    },
    onSuccess: (newColumn) => {
      queryClient.invalidateQueries(['columns'])
      closeModal()
      toast.success(`${newColumn.title} ${t('toast.created')}.`)
    }
  })

  const { mutate: removeColumn } = useMutation({
    mutationFn: ({ boardId, columnId }: { boardId: string; columnId: string }) =>
      deleteColumn(boardId, columnId),
    onSuccess: (column) => {
      queryClient.invalidateQueries(['columns'])
      closeModal()
      toast.success(`${column.title} ${t('toast.deleted')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const { mutate: updateColumn } = useMutation({
    mutationFn: ({
      boardId,
      columnId,
      ...params
    }: {
      boardId: string
      columnId: string
      title: string
      order: number
    }) => {
      return patchColumn(boardId, columnId, params)
    },
    onSuccess: (column) => {
      queryClient.invalidateQueries(['columns'])
      closeModal()
      toast.success(`${column.title} ${t('toast.updated')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const { mutate: updateColumns } = useMutation({
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
    }
  })

  const onDragColumnComplete: OnDragEndResponder = (result) => {
    if (!result.destination || !columnsQuery.data) return

    const sorted = columnsQuery.data.sort((a, b) => a.order - b.order)
    const [removed] = sorted.splice(result.source.index, 1)
    sorted.splice(result.destination.index, 0, removed)

    const data = sorted.map((column, idx) => ({ ...column, order: idx }))

    updateColumns(data)
  }

  const { mutate: addTask } = useMutation({
    mutationFn: ({
      userId,
      boardId,
      columnId,
      ...params
    }: {
      userId: string
      boardId: string
      columnId: string
      title: string
      description: string
      order: number
    }) => {
      return createTask(userId, boardId, columnId, params)
    },
    onSuccess: (newColumn) => {
      queryClient.invalidateQueries(['columns'])
      queryClient.invalidateQueries(['tasks'])
      queryClient.invalidateQueries(['my-tasks']) // User's tasks on Profile Page
      closeModal()
      toast.success(`${newColumn.title} ${t('toast.created')}.`)
    }
  })

  const { mutate: removeTask } = useMutation({
    mutationFn: ({ columnId, taskId }: { columnId: string; taskId: string }) =>
      deleteTask(boardId, columnId, taskId),
    onSuccess: (task) => {
      queryClient.invalidateQueries(['tasks'])
      closeModal()
      toast.success(`${task.title} ${t('toast.deleted')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const { mutate: updateTask } = useMutation({
    mutationFn: ({
      boardId,
      columnId,
      taskId,
      ...params
    }: {
      boardId: string
      columnId: string
      taskId: string
      title: string
      order: number
      description: string
      userId: string
      users: string[]
    }) => {
      return patchTask(boardId, columnId, taskId, params)
    },
    onSuccess: (column) => {
      queryClient.invalidateQueries(['tasks'])
      closeModal()
      toast.success(`${column.title} ${t('toast.updated')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const columns = useMemo(() => {
    const withTasks = columnsQuery.data?.map((column) => {
      return {
        ...column,
        tasks: tasksQuery.data?.filter((task) => task.columnId === column._id)
      }
    })

    return withTasks?.sort((a, b) => a.order - b.order)
  }, [columnsQuery.data, tasksQuery.data])

  return {
    isAuthenticated,
    userId,
    isLoading: boarQuery.isLoading || columnsQuery.isLoading || tasksQuery.isLoading,
    isError: boarQuery.isError || columnsQuery.isError || tasksQuery.error,
    error: boarQuery.error || columnsQuery.error || tasksQuery.error,
    board: boarQuery.data || ({} as Board),
    columns,
    modal,
    openModal,
    closeModal,
    addColumn,
    updateColumn,
    removeColumn,
    onDragColumnComplete,
    addTask,
    updateTask,
    removeTask
  }
}
