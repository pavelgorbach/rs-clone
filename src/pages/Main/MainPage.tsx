import { useTranslation } from 'react-i18next'

import { Button, BoardCard, Loader, CreateBoardForm, Modal } from '@/components'
import useMainPage from './useMainPage'

export default function Main() {
  const { t } = useTranslation()

  const {
    isLoading,
    isError,
    error,
    data,
    createModalOpen,
    closeModal,
    openModal,
    createBoard,
    updateBoard,
    deleteBoard
  } = useMainPage()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <div>
        {t('boardPage.error')} {error?.message}
      </div>
    )
  }

  return (
    <>
      <div className="container m-auto">
        <input type="search" placeholder={t('boardPage.search')} />

        <h2>{t('boardPage.board')}</h2>

        <Button text={t('boardPage.new')} onClick={openModal} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {data?.map((board) => {
            return (
              <BoardCard
                key={board.id}
                name={board.name}
                id={board.id}
                description={board.description}
                onDelete={deleteBoard}
                onUpdate={updateBoard}
              />
            )
          })}
        </div>
      </div>

      <Modal isOpen={createModalOpen} onClose={closeModal} title={t('createBoardForm.create')}>
        <CreateBoardForm onSubmit={createBoard} />
      </Modal>
    </>
  )
}
