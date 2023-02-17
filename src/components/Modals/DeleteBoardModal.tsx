import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, Button } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useDeleteBoard from '@/hooks/useDeleteBoard'

function DeleteBoardModalView() {
  const { t } = useTranslation()

  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const deleteBoard = useDeleteBoard(close)

  return (
    <Modal isOpen={name === 'delete-board'} onClose={close} title={t('common.confirmation')}>
      <div className="prose">
        <p>{t('boardCard.question')}</p>

        <div className="flex justify-between">
          <Button type="success" text={t('common.cancel')} onClick={close} />
          <Button
            type="error"
            text={t('common.delete')}
            onClick={() => {
              if (name === 'delete-board') {
                deleteBoard.mutate(data.boardId)
              }
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export const DeleteBoardModal = observer(DeleteBoardModalView)
