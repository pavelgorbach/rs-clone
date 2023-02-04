import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import * as api from '@/api'
import { Board } from '@/api'

export default function useBoards() {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery<Board[], Error>('boards', api.getBoards)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const createMutation = useMutation(api.createBoard, {
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries('boards')
      closeModal()
      toast(`${newBoard.name} created.`)
    }
  })

  const updateMutation = useMutation(api.updateBoard, {
    onSuccess: (updatedBoard) => {
      queryClient.invalidateQueries('boards')
      toast(`${updatedBoard.id} updated.`)
    }
  })

  const deleteMutation = useMutation(api.deleteBoard, {
    onSuccess: (id) => {
      queryClient.invalidateQueries('boards')
      toast(`${id} deleted.`)
    }
  })

  const createBoard = (data: Omit<Board, 'id'>) => {
    createMutation.mutate(data)
  }

  const updateBoard = (data: Board) => {
    updateMutation.mutate(data)
  }

  const deleteBoard = (id: number) => {
    deleteMutation.mutate(id)
  }

  const openModal = () => {
    setCreateModalOpen(true)
  }

  const closeModal = () => {
    setCreateModalOpen(false)
  }

  return {
    isLoading,
    isError,
    data,
    error,
    createModalOpen,
    openModal,
    closeModal,
    createBoard,
    updateBoard,
    deleteBoard
  }
}