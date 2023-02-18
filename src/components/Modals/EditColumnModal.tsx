import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, EditColumnForm, EditColumnFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useUpdateColumn from '@/hooks/useUpdateColumn'

function EditColumnModalView() {
  const { t } = useTranslation()

  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const updateColumn = useUpdateColumn()

  const handleUpdateColumn = async (formData: EditColumnFormData) => {
    if (name === 'edit-column') {
      updateColumn.mutate({
        boardId: data.boardId,
        columnId: data._id,
        order: data.order,
        ...formData
      })

      close()
    }
  }

  return (
    <Modal isOpen={name === 'edit-column'} onClose={close} title={t('common.edit')}>
      <EditColumnForm
        title={name === 'edit-column' ? data.title : ''}
        onSubmit={handleUpdateColumn}
      />
    </Modal>
  )
}

export const EditColumnModal = observer(EditColumnModalView)
