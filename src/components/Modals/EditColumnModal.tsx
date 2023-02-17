import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, EditColumnForm } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useUpdateColumn from '@/hooks/useUpdateColumn'

function EditColumnModalView() {
  const { t } = useTranslation()

  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const updateColumn = useUpdateColumn(close)

  return (
    <Modal isOpen={name === 'edit-column'} onClose={close} title={t('common.edit')}>
      <EditColumnForm
        title={name === 'edit-column' ? data.title : ''}
        onSubmit={(formData) => {
          if (name === 'edit-column') {
            updateColumn.mutate({
              boardId: data.boardId,
              columnId: data._id,
              order: data.order,
              ...formData
            })
          }
        }}
      />
    </Modal>
  )
}

export const EditColumnModal = observer(EditColumnModalView)
