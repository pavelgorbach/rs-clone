import { useForm } from 'react-hook-form'

import { Button } from '@/components'
import { Board } from '@/api'

type FormData = Omit<Board, 'id'>

type Props = {
  onSubmit: (data: FormData) => void
}

export function CreateBoardForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<FormData>()
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input type="text" {...register('name', { required: true })} placeholder="Name" />
      {errors.name && <span className="text-sm text-red-500">Name is required</span>}

      <textarea {...register('description', { required: true })} placeholder="Description" />
      {errors.description && <span className="text-sm text-red-500">Desctiption is required</span>}

      <Button text="Create" onClick={submit} />
    </div>
  )
}
