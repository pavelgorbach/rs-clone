import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Button } from './Button'
import { Modal } from './Modal'
import useModalStore from '@/hooks/useModalStore'
import useDeleteColumn from '@/hooks/useDeleteColumn'

function DeleteColumnModalView() {
  const { t } = useTranslation()

  const store = useModalStore()
  const { name, data } = store.state

  const close = () => store.closeModal()

  const deleteColumn = useDeleteColumn(close)

  return (
    <Modal isOpen={name === 'delete-column'} onClose={close} title={t('common.confirmation')}>
      <div className="prose">
        <p>{t('column.question')}</p>

        <div className="flex justify-between">
          <Button type="success" text={t('common.cancel')} onClick={close} />
          <Button
            type="error"
            text={t('common.delete')}
            onClick={() => {
              if (name == 'delete-column') {
                deleteColumn.mutate(data)
              }
            }}
          />
        </div>
      </div>
    </Modal>
  )
}

export const DeleteColumnModal = observer(DeleteColumnModalView)
