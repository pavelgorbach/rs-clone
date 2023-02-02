import { useState } from 'react'

import { Button, EditProfileForm, Modal } from '@/components'

export default function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  function toggleEditModal() {
    setIsEditOpen((state) => !state)
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((state) => !state)
  }

  return (
    <>
      <h2>Profile</h2>

      <div className="flex max-w-sm flex-col gap-4 self-center">
        <img src="" alt="avatar" className="h-20 w-20 rounded-full bg-teal-700 text-white" />

        <Button text="Edit" onClick={toggleEditModal} />
        <Button text="Delete" onClick={toggleDeleteModal} />

        <Modal isOpen={isEditOpen} onClose={toggleEditModal}>
          <EditProfileForm
            onSubmit={(data) => {
              console.log(data) // TODO: send data to server
              toggleEditModal()
            }}
          />
        </Modal>

        <Modal isOpen={isDeleteOpen} onClose={toggleDeleteModal} title="Confirmation">
          <div>Are you sure you want to do this?</div>
        </Modal>
      </div>
    </>
  )
}
