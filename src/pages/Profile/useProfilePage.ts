import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { deleteUser, fetchUser, updateUser } from '@/api/users'
import useAuthStore from '@/hooks/useAuthStore'
import { EditProfileFormData } from '@/components'
import { fetchTasks } from '@/api/tasks'
import jwtDecode from 'jwt-decode'

type ModalName = 'edit' | 'delete'

export default function useProfilePage() {
  const [modal, setModal] = useState<ModalName | null>(null)

  const authStore = useAuthStore()
  const { isAuthenticated, userId } = authStore

  const {
    data: user,
    isLoading,
    refetch
  } = useQuery({
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
  async function getTasks() {
    if (userId) {
      return fetchTasks(userId)
    }
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
    handleUpdate,
    getTasks,

  }
}
