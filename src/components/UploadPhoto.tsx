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
    <form>
      <input {...register('file')} type="file" id="photo" />
      <Button text={'Upload'} onClick={submit}></Button>
    </form>
  )
}
