import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Modal, EditBoardForm } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useUpdateBoard from '@/hooks/useUpdateBoard'

function EditBoardModalView() {
  const { t } = useTranslation()
  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const updateBoard = useUpdateBoard(close)

  return (
    <Modal isOpen={name === 'edit-board'} onClose={close} title={t('common.edit')}>
      <EditBoardForm
        title={name === 'edit-board' ? data.title : ''}
        onSubmit={(formData) => {
          if (name === 'edit-board') {
            updateBoard.mutate({
              ...formData,
              ...data
            })
          }
        }}
      />
    </Modal>
  )
}

export const EditBoardModal = observer(EditBoardModalView)
