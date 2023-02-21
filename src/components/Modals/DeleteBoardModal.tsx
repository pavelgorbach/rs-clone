import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, Button } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useDeleteBoard from '@/hooks/useDeleteBoard'

function DeleteBoardModalView() {
  const { t } = useTranslation()

  const deleteBoard = useDeleteBoard()
  const modal = useModalStore()

  const { isLoading } = deleteBoard
  const { name, data } = modal.state

  const close = () => modal.close()

  const handleDeleteBoard = async () => {
    if (name === 'delete-board') {
      await deleteBoard.mutateAsync(data.boardId)
      close()
    }
  }

  return (
    <Modal isOpen={name === 'delete-board'} onClose={close} title={t('common.confirmation')}>
      <div className="prose dark:text-slate-200">
        <p>{t('boardCard.question')}</p>

        <div className="flex justify-between">
          <Button type="success" text={t('common.cancel')} onClick={close} />
          <Button
            type="error"
            text={t('common.delete')}
            disabled={isLoading}
            onClick={handleDeleteBoard}
          />
        </div>
      </div>
    </Modal>
  )
}

export const DeleteBoardModal = observer(DeleteBoardModalView)
