import { useState } from 'react'

interface Props {
  name: string | null
}

export default function useModal<T extends Props>() {
  const [modal, setModal] = useState({ name: null } as T)

  const openModal = (data: T) => {
    setModal(data)
  }

  const closeModal = () => {
    setModal({ name: null } as T)
  }

  return {
    modal,
    openModal,
    closeModal
  }
}
