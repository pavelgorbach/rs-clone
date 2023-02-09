import { useState, useMemo, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { StoreContext } from '@/store.context'
import { fetchBoards, createBoard, patchBoard, deleteBoard } from '@/api'
import { CreateBoardFormData } from '@/components'
import { Board } from '@/api/types'

export default function useBoards() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { authStore } = useContext(StoreContext)
  const isAuthenticated = authStore.isAuthenticated()
  const authUser = authStore.getUser()

  const { isLoading, isError, data, error } = useQuery(['boards'], fetchBoards)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [focusValue, setFocusValue] = useState(false)

  const searchBoards = useMemo(() => {
    return data ? data.filter((board) => board.title.toLowerCase().includes(searchValue)) : []
  }, [data, searchValue])

  const createMutation = useMutation(createBoard, {
    onSuccess: (newBoard) => {
      queryClient.invalidateQueries(['boards'])
      closeModal()
      toast(`${newBoard.title} ${t('toast.created')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const updateMutation = useMutation(patchBoard, {
    onSuccess: (updatedBoard) => {
      queryClient.invalidateQueries(['boards'])
      toast(`${updatedBoard._id} ${t('toast.updated')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const deleteMutation = useMutation(deleteBoard, {
    onSuccess: (id) => {
      queryClient.invalidateQueries(['boards'])
      toast(`${id} ${t('toast.deleted')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const addBoard = (data: CreateBoardFormData) => {
    createMutation.mutate({
      ...data,
      owner: authUser?._id || '',
      users: []
    })
  }

  const updateBoard = (data: Board) => {
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
