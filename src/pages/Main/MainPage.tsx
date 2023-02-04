import { Button, BoardCard, Loader, CreateBoardForm, Modal } from '@/components'
import useMainPage from './useMainPage'

export default function Main() {
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
    return <div>An error occured: {error?.message}</div>
  }

  return (
    <>
      <div className="container m-auto">
        <input type="search" placeholder="search" />

        <h2>Boards</h2>

        <Button text="Create new board" onClick={openModal} />

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

      <Modal isOpen={createModalOpen} onClose={closeModal} title="Create">
        <CreateBoardForm onSubmit={createBoard} />
      </Modal>
    </>
  )
}
