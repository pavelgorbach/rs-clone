import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { deleteUser, fetchUser, updateUser } from '@/api/users'
import useAuthStore from '@/hooks/useAuthStore'
import { EditProfileFormData } from '@/components'
import { fetchTasksByUserId } from '@/api/tasks'
import { FileList } from '@/api'
import { uploadFile } from '@/api/files'

type ModalName = 'edit' | 'delete' | 'uploadPhoto'

export default function useProfilePage() {
  const { t } = useTranslation()

  const [modal, setModal] = useState<ModalName | null>(null)

  const authStore = useAuthStore()
  const { isAuthenticated, userId, exp } = authStore

  const {
    data: user,
    isLoading,
    refetch: refetchUser
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

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (user) => {
      authStore.unauth()
      toast.success(`${user.name} ${t('toast.deleted')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      refetchUser()
      closeModal()
      toast.success(`${user.name} ${t('toast.updated')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (file) => {
      closeModal()
      toast.success(`${file.name} ${t('toast.updated')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
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

  function openUploadPhotoModal() {
    setModal('uploadPhoto')
  }


  function handleDelete() {
    deleteMutation.mutate(userId)
  }

  function handlePhoto(data: FileList):void {
    const file = data.data[0]
    uploadMutation.mutate(file)
    console.log(file)
    
  }

  async function handleUpdate(data: EditProfileFormData) {
    updateMutation.mutate({
      _id: userId,
      ...data
    })
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
    handleUpdate,
    openUploadPhotoModal,
    handlePhoto,
  }
}
