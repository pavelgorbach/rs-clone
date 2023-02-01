import { useQuery, useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { Board, getColumns, postColumn } from '@/api'

let counter = 0

export default function useColumns() {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery<Board[], Error>('columns', getColumns)

  const mutation = useMutation(postColumn, {
    onSuccess: (newColumn) => {
      queryClient.invalidateQueries('columns')
      toast(`${newColumn.name} created.`)
    }
  })

  const addNew = () => {
    counter++

    mutation.mutate({
      id: counter,
      name: `Column ${counter}`
    })
  }

  return {
    isLoading,
    isError,
    data,
    error,
    addNew
  }
}
