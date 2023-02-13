import { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { createBoard, patchBoard, deleteBoard, fetchUserBoards } from '@/api'
import { CreateBoardFormData } from '@/components'
import { Board } from '@/api/types'
import useAuthStore from '@/hooks/useAuthStore'

export default function useBoards() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { userId, isAuthenticated } = useAuthStore()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['boards', userId, isAuthenticated],
    queryFn: () => fetchUserBoards(userId),
    enabled: isAuthenticated && !!userId
  })

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [focusValue, setFocusValue] = useState(false)

  const searchBoards = useMemo(() => {
    return data ? data.filter((board) => board.title.toLowerCase().includes(searchValue)) : []
  }, [data, searchValue])

  const createMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: (board) => {
      queryClient.invalidateQueries(['boards'])
      closeModal()
      toast.success(`${board.title} ${t('toast.created')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const updateMutation = useMutation({
    mutationFn: patchBoard,
    onSuccess: (board) => {
      queryClient.invalidateQueries(['boards'])
      toast.success(`${board.title} ${t('toast.updated')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBoard,
    onSuccess: (board) => {
      queryClient.invalidateQueries(['boards'])
      toast.success(`${board.title} ${t('toast.deleted')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const addBoard = ({ title }: CreateBoardFormData) => {
    if (!userId) {
      console.warn('User id is not provided.')
      return
    }

    createMutation.mutate({
      title,
      owner: userId,
      users: [userId]
    })
  }

  const updateBoard = (data: Board) => {
    if (!userId) {
      console.warn('User id is not provided.')
      return
    }

    updateMutation.mutate(data)
  }

  const removeBoard = (id: string) => {
    deleteMutation.mutate(id)
  }

  const openModal = () => {
    setCreateModalOpen(true)
  }

  const closeModal = () => {
    setCreateModalOpen(false)
  }

  return {
    isAuthenticated,
    isLoading,
    isError,
    boards: searchBoards,
    error,
    createModalOpen,
    focusValue,
    openModal,
    closeModal,
    addBoard,
    updateBoard,
    removeBoard,
    setSearchValue,
    setFocusValue
  }
}
