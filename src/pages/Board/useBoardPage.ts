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
  patchColumn
} from '@/api'
import useAuthStore from '@/hooks/useAuthStore'
import { CreateColumnFormData } from '@/components'

export default function useBoardPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { id: boardId } = useParams()
  const { isAuthenticated } = useAuthStore()
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

  const onDragComplete: OnDragEndResponder = (result) => {
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

  return {
    isAuthenticated,
    board,
    isLoading,
    isError,
    columns: sortedColumns,
    error,
    createModalOpen,
    addColumn,
    updateColumn,
    removeColumn,
    openCreateColumnModal,
    closeCreateColumnModal,
    onDragComplete
  }
}
