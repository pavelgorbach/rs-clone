import { useState, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchUser } from '@/api/users'
import { StoreContext } from '@/store.context'

export default function useProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { authStore } = useContext(StoreContext)
  const authUser = authStore.getUser()
  const isAuthenticated = authStore.isAuthenticated()

  const { data: user, isLoading } = useQuery(['user'], () => fetchUser(authUser?._id || ''))

  function toggleEditModal() {
    setIsEditOpen((state) => !state)
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((state) => !state)
  }

  function deleteUser() {
    console.log('delete user')
  }

  return {
    isAuthenticated,
    isLoading,
    isEditOpen,
    isDeleteOpen,
    user,
    deleteUser,
    toggleDeleteModal,
    toggleEditModal
  }
}
