import { useState } from 'react'

export default function useProfilePage() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  function toggleEditModal() {
    setIsEditOpen((state) => !state)
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((state) => !state)
  }

  function deleteUser() {
    console.log('delete user')
  }

  return {
    isEditOpen,
    isDeleteOpen,
    deleteUser,
    toggleDeleteModal,
    toggleEditModal
  }
}
