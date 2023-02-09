import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { OnDragEndResponder } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { createColumn, fetchColumns, updateColumnsSet, fetchBoardById } from '@/api'
import useAuthStore from '@/hooks/useAuthStore'
import { useMemo } from 'react'

export default function useBoardPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { id: boardId } = useParams()
  const { isAuthenticated } = useAuthStore()

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

  const postMutation = useMutation(createColumn, {
    onSuccess: (newColumn) => {
      queryClient.invalidateQueries(['columns'])
      toast(`${newColumn.title} ${t('toast.created')}.`)
    }
  })

  const setMutation = useMutation(updateColumnsSet, {
    onSuccess: () => {
      queryClient.invalidateQueries(['columns'])
    }
  })

  const handleAdd = () => {
    if (!boardId) {
      console.warn('Board id is not provided.')
      return
    }

    postMutation.mutate({
      boardId,
      order: columns?.length || 0,
      title: `${t('common.column')} ${Math.random().toFixed(3)}`
    })
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
    handleAdd,
    onDragComplete
  }
}
