import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Board, getBoards, postBoard } from '@/api'

let counter = 0

export default function useBoards() {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery<Board[], Error>('boards', getBoards)

  const mutation = useMutation(postBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries('boards')
    }
  })

  const addNew = () => {
    counter++

    mutation.mutate({
      id: counter,
      name: `Board ${counter}`
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
