import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, CreateColumnForm, CreateColumnFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useAddColumn from '@/hooks/useAddColumn'

function CreateColumnModalView() {
  const { t } = useTranslation()

  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const addColumn = useAddColumn()

  const handleAddColumn = async (formData: CreateColumnFormData) => {
    if (name === 'add-column') {
      await addColumn.mutateAsync({ ...data, ...formData })
      close()
    }
  }

  return (
    <Modal isOpen={name === 'add-column'} onClose={close} title={t('common.create')}>
      <CreateColumnForm onSubmit={handleAddColumn} />
    </Modal>
  )
}

export const CreateColumnModal = observer(CreateColumnModalView)
