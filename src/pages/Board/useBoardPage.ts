import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { OnDragEndResponder } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { StoreContext } from '@/store.context'
import { createColumn, fetchColumns, updateColumnsSet } from '@/api'

export default function useBoardPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { id: boardId } = useParams()

  const { authStore } = useContext(StoreContext)
  const isAuthenticated = authStore.isAuthenticated()

  const { isLoading, isError, data, error } = useQuery(
    ['columns'],
    () => fetchColumns(boardId || ''),
    {
      enabled: isAuthenticated && !!boardId,
      select: (data) => data
    }
  )

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

  const addNew = () => {
    postMutation.mutate({
      order: data?.length || 0,
      title: `${t('common.column')}`,
      boardId: ''
    })
  }

  const onDragComplete: OnDragEndResponder = (result) => {
    if (!result.destination) return

    const arr = data ? [...data] : []
    const removedItem = arr.splice(result.source.index, 1)[0]
    arr.splice(result.destination.index, 0, removedItem)

    setMutation.mutate(arr)
  }

  return {
    isAuthenticated,
    boardId,
    isLoading,
    isError,
    data,
    error,
    addNew,
    onDragComplete
  }
}
