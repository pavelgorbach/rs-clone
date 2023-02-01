import { Button } from '@/components'

import './style.css'

export default function Profile() {
  const onEdit = () => {
    console.log('on edit')
  }

  const onDelete = () => {
    console.log('on delete')
  }

  return (
    <>
      <h2>Profile</h2>

      <div className="profile-form">
        <img src="" alt="avatar" className="h-20 w-20 rounded-full bg-teal-700 text-white" />
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <Button text="Edit" onClick={onEdit} />
        <Button text="Delete" onClick={onDelete} />
      </div>
    </>
  )
}
