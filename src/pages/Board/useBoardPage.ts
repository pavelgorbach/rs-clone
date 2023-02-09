import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { OnDragEndResponder } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Column, getColumns, createColumn, setColumns } from '@/api'

let counter = 0

export default function useBoardPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { id: boardId } = useParams()

  const { isLoading, isError, data, error } = useQuery<Column[], Error>(['columns'], getColumns)

  const postMutation = useMutation(createColumn, {
    onSuccess: (newColumn) => {
      queryClient.invalidateQueries(['columns'])
      toast(`${newColumn.title} ${t('toast.created')}.`)
    }
  })

  const setMutation = useMutation(setColumns, {
    onSuccess: () => {
      queryClient.invalidateQueries(['columns'])
    }
  })

  const addNew = () => {
    counter++

    postMutation.mutate({
      _id: counter.toString(),
      order: counter,
      title: `${t('common.column')} ${counter}`,
      boardId: boardId || ''
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
    boardId,
    isLoading,
    isError,
    data,
    error,
    addNew,
    onDragComplete
  }
}
