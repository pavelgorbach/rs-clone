import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, CreateColumnForm, CreateColumnFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useAddColumn from '@/hooks/useAddColumn'

function CreateColumnModalView() {
  const { t } = useTranslation()

  const addColumn = useAddColumn()
  const modal = useModalStore()

  const { isLoading } = addColumn
  const { name, data } = modal.state

  const close = () => modal.close()

  const handleAddColumn = async (formData: CreateColumnFormData) => {
    if (name === 'add-column') {
      await addColumn.mutateAsync({ ...data, ...formData })
      close()
    }
  }

  return (
    <Modal isOpen={name === 'add-column'} onClose={close} title={t('common.create')}>
      <CreateColumnForm onSubmit={handleAddColumn} disabled={isLoading} />
    </Modal>
  )
}

export const CreateColumnModal = observer(CreateColumnModalView)
