import { useQuery, useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { Board, getBoards, postBoard } from '@/api'

let counter = 0

export default function useBoards() {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery<Board[], Error>('boards', getBoards)

  const mutation = useMutation(postBoard, {
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries('boards')
      toast(`${newBoard.name} created.`)
    }
  })

  const addNew = () => {
    counter++

    mutation.mutate({
      id: counter,
      name: `Board ${counter}`,
      description: 'some description Board'
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
