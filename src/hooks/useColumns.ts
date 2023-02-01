import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Board, getColumns, postColumn } from '@/api'

let counter = 0

export default function useColumns() {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery<Board[], Error>('columns', getColumns)

  const mutation = useMutation(postColumn, {
    onSuccess: () => {
      queryClient.invalidateQueries('columns')
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
