import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Modal, Button } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useDeleteColumn from '@/hooks/useDeleteColumn'

function DeleteColumnModalView() {
  const { t } = useTranslation()

  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

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
