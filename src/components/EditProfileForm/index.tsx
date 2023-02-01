import { useForm } from 'react-hook-form'

import { Button } from '@/components'

type FormData = {
  name: string
  email: string
  password: string
}

type Props = {
  onSubmit: (data: FormData) => void
}

export function EditProfileForm({ onSubmit }: Props) {
  const { register, handleSubmit, formState } = useForm<FormData>()
  const { errors } = formState

  const submit = handleSubmit(onSubmit)

  return (
    <div className="flex flex-col gap-2">
      <input type="text" {...register('name', { required: true })} placeholder="name" />
      {errors.name && 'Name is required'}
      <input type="email" {...register('email', { required: true })} placeholder="email" />
      {errors.email && 'Email is required'}

      <p>Confirm changes by current password</p>
      <input type="password" {...register('password', { required: true })} placeholder="password" />
      {errors.password && 'Password is required'}

      <Button text="Change" onClick={submit} />
    </div>
  )
}
