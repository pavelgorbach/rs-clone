import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { deleteUser, fetchUser, updateUser } from '@/api/users'
import useAuthStore from '@/hooks/useAuthStore'
import { EditProfileFormData } from '@/components'
import { fetchTasksByUserId } from '@/api/tasks'

type ModalName = 'edit' | 'delete'

export default function useProfilePage() {
  const [modal, setModal] = useState<ModalName | null>(null)

  const authStore = useAuthStore()
  const { isAuthenticated, userId, exp } = authStore

  const {
    data: user,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId
  })

  const { data: tasks } = useQuery({
    queryKey: ['my-tasks', userId],
    queryFn: () => fetchTasksByUserId(userId),
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
    if (userId) {
      deleteUser(userId)
    }
    authStore.unauth()
  }

  async function handleUpdate(data: EditProfileFormData) {
    if (userId) {
      await updateUser(userId, data)
      refetch()
      closeModal()
    }
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    modal,
    tasks,
    exp,
    unauth: authStore.unauth,
    closeModal,
    openEditModal,
    openDeleteModal,
    handleDelete,
    handleUpdate
  }
}
