import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, Button } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useDeleteTask from '@/hooks/useDeleteTask'

function DeleteTaskModalView() {
  const { t } = useTranslation()

  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const deleteTask = useDeleteTask()

  const handleDeleteTask = async () => {
    if (name === 'delete-task') {
      await deleteTask.mutateAsync(data)
      close()
    }
  }

  return (
    <Modal isOpen={name === 'delete-task'} onClose={close} title={t('common.confirmation')}>
      <div className="prose dark:text-slate-200">
        <p>{t('column.question')}</p>

        <div className="flex justify-between">
          <Button type="success" text={t('common.cancel')} onClick={close} />
          <Button type="error" text={t('common.delete')} onClick={handleDeleteTask} />
        </div>
      </div>
    </Modal>
  )
}

export const DeleteTaskModal = observer(DeleteTaskModalView)
