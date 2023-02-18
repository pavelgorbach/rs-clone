import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, CreateBoardForm, CreateBoardFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useAddBoard from '@/hooks/useAddBoard'

function CreateBoardModalView() {
  const { t } = useTranslation()

  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const addBoard = useAddBoard()

  const handleAddBoard = async (formData: CreateBoardFormData) => {
    if (name === 'add-board') {
      await addBoard.mutateAsync({
        owner: data.userId,
        users: [data.userId],
        ...formData
      })

      close()
    }
  }

  return (
    <Modal isOpen={name === 'add-board'} onClose={close} title={t('common.create')}>
      <CreateBoardForm onSubmit={handleAddBoard} />
    </Modal>
  )
}

export const CreateBoardModal = observer(CreateBoardModalView)
