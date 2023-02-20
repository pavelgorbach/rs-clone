import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { Modal, EditBoardForm, EditBoardFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useUpdateBoard from '@/hooks/useUpdateBoard'

function EditBoardModalView() {
  const { t } = useTranslation()
  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const updateBoard = useUpdateBoard()

  const { isLoading } = updateBoard

  const handleUpdateBoard = async (formData: EditBoardFormData) => {
    if (name === 'edit-board') {
      await updateBoard.mutateAsync({
        ...data,
        ...formData
      })

      close()
    }
  }

  return (
    <Modal isOpen={name === 'edit-board'} onClose={close} title={t('common.edit')}>
      <EditBoardForm
        title={name === 'edit-board' ? data.title : ''}
        disabled={isLoading}
        onSubmit={handleUpdateBoard}
      />
    </Modal>
  )
}

export const EditBoardModal = observer(EditBoardModalView)
