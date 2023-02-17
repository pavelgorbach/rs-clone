import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, CreateBoardForm } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useAddBoard from '@/hooks/useAddBoard'

function CreateBoardModalView() {
  const { t } = useTranslation()

  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const addBoard = useAddBoard(close)

  return (
    <Modal isOpen={name === 'add-board'} onClose={close} title={t('common.create')}>
      <CreateBoardForm
        onSubmit={(formData) => {
          if (name === 'add-board') {
            addBoard.mutate({
              owner: data.userId,
              users: [data.userId],
              ...formData
            })
          }
        }}
      />
    </Modal>
  )
}

export const CreateBoardModal = observer(CreateBoardModalView)
