import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import * as api from '@/api'
import { Board } from '@/api'

export default function useBoards() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { isLoading, isError, data, error } = useQuery<Board[], Error>(['boards'], api.getBoards)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [focusValue, setFocusValue] = useState(false)

  const searchBoards = useMemo(() => {
    return data ? data.filter((board) => board.name.toLowerCase().includes(searchValue)) : []
  }, [data, searchValue])

  const createMutation = useMutation(api.createBoard, {
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries(['boards'])
      closeModal()
      toast(`${newBoard.name} ${t('toast.created')}.`)
    }
  })

  const updateMutation = useMutation(api.updateBoard, {
    onSuccess: (updatedBoard) => {
      queryClient.invalidateQueries(['boards'])
      toast(`${updatedBoard.id} ${t('toast.updated')}.`)
    }
  })

  const deleteMutation = useMutation(api.deleteBoard, {
    onSuccess: (id) => {
      queryClient.invalidateQueries(['boards'])
      toast(`${id} ${t('toast.deleted')}.`)
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
    boards: searchBoards,
    error,
    createModalOpen,
    focusValue,
    openModal,
    closeModal,
    createBoard,
    updateBoard,
    deleteBoard,
    setSearchValue,
    setFocusValue
  }
}
