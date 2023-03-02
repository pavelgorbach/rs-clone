import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, Button } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useDeleteUser from '@/hooks/useDeleteUser'
import useAuthStore from '@/hooks/useAuthStore'

function DeleteUserModalView() {
  const { t } = useTranslation()

  const modal = useModalStore()
  const auth = useAuthStore()
  const deleteUser = useDeleteUser()

  const { isLoading } = deleteUser
  const { name, data } = modal.state

  const close = () => modal.close()

  const handleDeleteUser = async () => {
    if (name === 'delete-user') {
      await deleteUser.mutateAsync(data.userId)
      auth.unauth()
      close()
    }
  }

  return (
    <Modal isOpen={name === 'delete-user'} onClose={close} title={t('common.confirmation')}>
      <div className="prose dark:text-slate-200">
        <p>{t('profile.sure')}</p>

        <div className="flex justify-between">
          <Button type="success" text={t('common.cancel')} onClick={close} />
          <Button
            type="error"
            text={t('common.delete')}
            disabled={isLoading}
            onClick={handleDeleteUser}
          />
        </div>
      </div>
    </Modal>
  )
}

export const DeleteUserModal = observer(DeleteUserModalView)
