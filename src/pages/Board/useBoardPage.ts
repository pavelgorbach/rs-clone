import { useMemo, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { OnDragEndResponder } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import {
  createColumn,
  fetchColumns,
  updateColumnsSet,
  fetchBoardById,
  Column,
  deleteColumn,
  patchColumn,
  Task
} from '@/api'
import useAuthStore from '@/hooks/useAuthStore'
import { CreateColumnFormData } from '@/components'
import { createTask, fetchTasksByBoardId } from '@/api/tasks'

export default function useBoardPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { id: boardId } = useParams()
  const { isAuthenticated, userId } = useAuthStore()
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const { data: board } = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => fetchBoardById(boardId),
    enabled: isAuthenticated && !!boardId
  })

  const {
    isLoading,
    isError,
    data: columns,
    error
  } = useQuery({
    queryKey: ['columns', boardId, isAuthenticated],
    queryFn: () => fetchColumns(boardId),
    enabled: isAuthenticated && !!boardId
  })

  const sortedColumns = useMemo(() => {
    return columns?.sort((a, b) => a.order - b.order)
  }, [columns])

  const { data: tasks } = useQuery({
    queryKey: ['tasks', boardId, columns, isAuthenticated],
    queryFn: () => fetchTasksByBoardId(boardId),
    enabled: isAuthenticated && !!boardId
  })

  const tasksByColumn = useMemo(() => {
    return (tasks || []).reduce((acc, curr) => {
      if (acc[curr.columnId]) {
        acc[curr.columnId].push(curr)
      } else {
        acc[curr.columnId] = [curr]
      }

      return acc
    }, {} as { [key: string]: Task[] })
  }, [tasks])

  const openCreateColumnModal = () => {
    setCreateModalOpen(true)
  }

  const closeCreateColumnModal = () => {
    setCreateModalOpen(false)
  }

  const postMutation = useMutation({
    mutationFn: createColumn,
    onSuccess: (newColumn) => {
      queryClient.invalidateQueries(['columns'])
      closeCreateColumnModal()
      toast.success(`${newColumn.title} ${t('toast.created')}.`)
    }
  })

  const setMutation = useMutation({
    mutationFn: updateColumnsSet,
    onSuccess: () => {
      queryClient.invalidateQueries(['columns'])
    }
  })

  const deleteMutation = useMutation({
    mutationFn: (columnId: string) => deleteColumn(boardId, columnId),
    onSuccess: (column) => {
      queryClient.invalidateQueries(['columns'])
      toast.success(`${column.title} ${t('toast.deleted')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const updateMutation = useMutation({
    mutationFn: patchColumn,
    onSuccess: (column) => {
      queryClient.invalidateQueries(['columns'])
      toast.success(`${column.title} ${t('toast.updated')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const addColumn = ({ title }: CreateColumnFormData) => {
    if (!boardId) {
      console.warn('Board id is not provided.')
      return
    }

    postMutation.mutate({
      boardId,
      order: columns?.length || 0,
      title: `${title}`
    })
  }

  const updateColumn = (data: Column) => {
    updateMutation.mutate(data)
  }

  const removeColumn = (columnId: string) => {
    deleteMutation.mutate(columnId)
  }

  const onDragColumnComplete: OnDragEndResponder = (result) => {
    if (!result.destination || !columns) return

    const a = columns[result.source.index]
    const b = columns[result.destination.index]

    const data = [
      {
        _id: a._id,
        order: b.order
      },
      {
        _id: b._id,
        order: a.order
      }
    ]

    setMutation.mutate(data)
  }

  const postTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (newColumn) => {
      queryClient.invalidateQueries(['columns'])
      queryClient.invalidateQueries(['tasks'])
      closeCreateColumnModal()
      toast.success(`${newColumn.title} ${t('toast.created')}.`)
    }
  })

  const addTask = ({
    boardId,
    columnId,
    title,
    description
  }: Pick<Task, 'boardId' | 'columnId' | 'title' | 'description'>) => {
    if (!userId) {
      console.warn('User id is not provided.')
      return
    }

    const order = tasksByColumn[columnId]?.length || 0

    postTaskMutation.mutate({
      userId,
      users: [userId],
      boardId,
      columnId,
      title,
      description,
      order
    })
  }

  const updateTask = () => {
    console.log('updatee task')
  }

  const deleteTask = () => {
    console.log('delete task')
  }

  return {
    isAuthenticated,
    board,
    isLoading,
    isError,
    columns: sortedColumns,
    error,
    createModalOpen,
    tasks: tasksByColumn,
    openCreateColumnModal,
    closeCreateColumnModal,
    addColumn,
    updateColumn,
    removeColumn,
    onDragColumnComplete,
    addTask,
    updateTask,
    deleteTask
  }
}
