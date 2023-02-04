import { useForm } from 'react-hook-form'

import { Button } from '@/components'
import { Board } from '@/api'

type Props = Board & {
  onSubmit: (data: Board) => void
}

export function EditBoardForm({ id, name, description, onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<Board>({
    defaultValues: { id, name, description }
  })

  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input className="hidden" type="hidden" {...register('id')} />

      <input type="text" {...register('name', { required: true })} placeholder="Name" />
      {errors.name && 'Name is required'}

      <textarea {...register('description', { required: true })} placeholder="Description" />
      {errors.description && 'Description is required'}

      <Button text="Change" onClick={submit} />
    </div>
  )
}
