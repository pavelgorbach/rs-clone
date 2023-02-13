import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'
import { Column } from '@/api'
type Props = {
  _id: string
  name: string
}

export function EditColumnForm() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-2">
      <input className="hidden" type="hidden" />

      <input type="text" placeholder={t('createBoardForm.name')} />

      <Button text={t('common.change')} onClick={() => console.log('submit')} />
    </div>
  )
}
