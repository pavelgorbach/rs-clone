import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/Button'
import { ChangeEvent, useState } from 'react'

export type UploadPhotoFormData = {
  file: File[]
}

type Props = {
  onSubmit: (data: UploadPhotoFormData) => void
  disabled?: boolean
}

export function UploadUserPhotoForm({ disabled, onSubmit }: Props) {
  const { t } = useTranslation()

  const { formState, register, handleSubmit } = useForm<UploadPhotoFormData>()
  const { errors } = formState

  const [imageSrc, setImage] = useState<string | null>(null)

  const submit = handleSubmit(onSubmit)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    if (file) {
      const image = URL.createObjectURL(file)
      setImage(image)
    }
  }

  return (
    <form className="aspect-square flex flex-col items-center overflow-hidden">
      <label
        htmlFor="photo"
        className="relative mb-4 flex h-80 w-full cursor-pointer flex-col items-center justify-center gap-10 overflow-hidden border-2 border-dashed"
      >
        <div>Drag&apos;n&apos;Drop your photo!</div>

        <img className="h-20 w-20" src="/icons/download-file-round-icon.svg" alt="" />

        {imageSrc && <img src={imageSrc} className="absolute" />}
      </label>

      <input
        className="absolute opacity-0"
        {...register('file', { required: true })}
        type="file"
        id="photo"
        onChange={handleChange}
        accept="image/png, image/jpeg"
      />
      {errors.file && <span className="text-sm text-red-500">{t('common.photoRequired')}</span>}

      <Button text={'Upload'} disabled={disabled} onClick={submit}></Button>
    </form>
  )
}
