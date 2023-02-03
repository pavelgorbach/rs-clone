import { Button } from '@/components'
import { useState } from 'react'

type Props = {
  name: string
  description: string
}
export function EditBoard({ name, description }: Props) {
  const [valueName, setValueName] = useState(name)
  const [valueDescription, setValueDescription] = useState(description)

  return (
    <div className="flex flex-col gap-2">
      <input type="text" value={valueName} onChange={(event) => setValueName(event.target.value)} />
      <textarea
        value={valueDescription}
        onChange={(event) => setValueDescription(event.target.value)}
      />
      <Button text="Change" onClick={() => console.log('Change')} />
    </div>
  )
}
