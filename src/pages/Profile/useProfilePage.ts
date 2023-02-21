import useAuthStore from '@/hooks/useAuthStore'
import useModalStore from '@/hooks/useModalStore'
import useUserTasks from '@/hooks/useUserTasks'
import useUser from '@/hooks/useUser'
import useUserPhoto from '@/hooks/useUserPhoto'

export default function useProfilePage() {
  const authStore = useAuthStore()
  const user = useUser(authStore.userId)
  const userPhoto = useUserPhoto(authStore.userId)
  const tasks = useUserTasks(authStore.userId)
  const modal = useModalStore()

  const { isAuthenticated, userId, exp } = authStore

  function openEditUserModal() {
    if (!userId || !user.data) return

    modal.open({
      name: 'edit-user',
      data: { userId, name: user.data.name, login: user.data.login }
    })
  }

  function openDeleteUserModal() {
    if (!userId) return
    modal.open({ name: 'delete-user', data: { userId } })
  }

  function openUploadPhotoModal() {
    if (!userId) return
    modal.open({ name: 'upload-user-photo', data: { userId } })
  }

  return {
    isAuthenticated,
    tokenExpiration: exp,
    isLoading: user.isLoading,
    user: user.data,
    tasks: tasks.data,
    userPhoto: userPhoto.data,
    unauth: authStore.unauth,
    openEditUserModal,
    openDeleteUserModal,
    openUploadPhotoModal
  }
}
