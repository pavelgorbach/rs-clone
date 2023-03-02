import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Modal, EditProfileForm, EditProfileFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useUpdateUser from '@/hooks/useUpdateUser'

function EditUserModalView() {
  const { t } = useTranslation()

  const updateUser = useUpdateUser()
  const modal = useModalStore()

  const { isLoading } = updateUser
  const { name, data } = modal.state

  const close = () => modal.close()

  const handleUpdateUser = async (formData: EditProfileFormData) => {
    if (name === 'edit-user') {
      await updateUser.mutateAsync({
        _id: data.userId,
        ...formData
      })

      close()
    }
  }

  return (
    <Modal isOpen={name === 'edit-user'} onClose={close} title={t('common.edit')}>
      <EditProfileForm
        name={name === 'edit-user' ? data.name : ''}
        login={name === 'edit-user' ? data.login : ''}
        disabled={isLoading}
        onSubmit={handleUpdateUser}
      />
    </Modal>
  )
}

export const EditUserModal = observer(EditUserModalView)
