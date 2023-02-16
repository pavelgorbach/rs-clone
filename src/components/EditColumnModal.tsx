import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal } from './Modal'
import { EditColumnForm } from './EditColumnForm'
import useModalStore from '@/hooks/useModalStore'
import useUpdateColumn from '@/hooks/useUpdateColumn'

function EditColumnModalView() {
  const { t } = useTranslation()

  const store = useModalStore()
  const close = () => store.closeModal()
  const { name, data } = store.state
  const updateColumn = useUpdateColumn(close)

  return (
    <Modal isOpen={name === 'edit-column'} onClose={close} title={t('common.edit')}>
      <EditColumnForm
        title={name === 'edit-column' ? data.title : ''}
        onSubmit={(formData) => {
          if (name === 'edit-column') {
            updateColumn.mutate({
              boardId: store.state.data.boardId,
              columnId: store.state.data._id,
              order: store.state.data.order,
              ...formData
            })
          }
        }}
      />
    </Modal>
  )
}

export const EditColumnModal = observer(EditColumnModalView)
