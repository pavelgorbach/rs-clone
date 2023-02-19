import { Button } from './Button'
import { useForm } from 'react-hook-form'
import { FileList } from '@/api'

type Props = {
  onSubmit: (data: FileList) => void
}

export function UploadPhoto({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm<FileList>()
  const submit = handleSubmit(onSubmit)

  return (
    <form className="aspect-square flex flex-col items-center">
      <label
        htmlFor="photo"
        className="mb-4 flex h-80 w-full flex-col items-center justify-center gap-10 border-2 border-dashed"
      >
        <div>Drag&apos;n&apos;Drop your photo!</div>
        <img className="w-1/5" src="/icons/download-file-round-icon.svg" alt="" />
      </label>
      <input className="absolute -z-10 opacity-0" {...register('file')} type="file" id="photo" />
      <Button text={'Upload'} onClick={submit}></Button>
    </form>
  )
}
