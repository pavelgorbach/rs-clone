import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { fetchUser } from '@/api/users'
import useAuthStore from '@/hooks/useAuthStore'
import { EditProfileFormData } from '@/components'

type ModalName = 'edit' | 'delete'

export default function useProfilePage() {
  const [modal, setModal] = useState<ModalName | null>(null)

  const { userId, isAuthenticated } = useAuthStore()

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId
  })

  function closeModal() {
    setModal(null)
  }

  function openEditModal() {
    setModal('edit')
  }

  function openDeleteModal() {
    setModal('delete')
  }

  function handleDelete() {
    console.log('delete user', userId)
    closeModal()
  }

  function handleUpdate(data: EditProfileFormData) {
    console.log('update user', data)
    closeModal()
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    modal,
    closeModal,
    openEditModal,
    openDeleteModal,
    handleDelete,
    handleUpdate
  }
}
