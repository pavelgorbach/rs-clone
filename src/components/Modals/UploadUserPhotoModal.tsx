import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useQueryClient } from '@tanstack/react-query'

import { Modal, UploadUserPhotoForm, UploadPhotoFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useUploadUserPhoto from '@/hooks/useUploadUserPhoto'
import useDeleteUserPhoto from '@/hooks/useDeleteUserPhoto'
import { File } from '@/api'

function UploadUserPhotoModalView() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const uploadPhoto = useUploadUserPhoto()
  const deletePhoto = useDeleteUserPhoto()
  const modal = useModalStore()

  const { isLoading } = uploadPhoto
  const { name, data } = modal.state

  const close = () => modal.close()

  const handleUploadPhoto = async (formData: UploadPhotoFormData) => {
    if (name === 'upload-user-photo') {
      const currentPhoto = queryClient.getQueryData<File>(['my-photo', data.userId])

      if (currentPhoto) {
        await deletePhoto.mutateAsync(currentPhoto._id)
      }

      const file = formData.file[0]
      await uploadPhoto.mutateAsync({ userId: data.userId, file })

      close()
    }
  }

  return (
    <Modal isOpen={name === 'upload-user-photo'} onClose={close} title={t('common.confirmation')}>
      <UploadUserPhotoForm onSubmit={handleUploadPhoto} disabled={isLoading} />
    </Modal>
  )
}

export const UploadUserPhotoModal = observer(UploadUserPhotoModalView)
