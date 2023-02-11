import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { ROUTES } from '@/router'
import { Button, CreateBoardForm, Loader, Modal } from '@/components'
import useBoardPage from './useBoardPage'
import { Breadcrumbs } from '@/components/Breadcrumbs'

function BoardPageView() {
  const { t } = useTranslation()

  const {
    isAuthenticated,
    board,
    isLoading,
    isError,
    error,
    columns,
    createModalOpen,
    handleAdd,
    openModal,
    closeModal,
    onDragComplete
  } = useBoardPage()
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.home} replace />
  }

  if (isLoading) {
    return (
      <div className="container m-auto">
        <Loader />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container m-auto">
        {t('boardsPage.error')} {error instanceof Error ? error.message : 'something went wrong'}
      </div>
    )
  }

  return (
    <>
      <Breadcrumbs title={board?.title} />
      <div className="continer m-auto">
        <Button text={t('boardPage.newColumn')} onClick={openModal} />

        <DragDropContext onDragEnd={onDragComplete}>
          <Droppable droppableId="drag-drop-list" direction="horizontal">
            {(provided) => (
              <div className="flex gap-4" {...provided.droppableProps} ref={provided.innerRef}>
                {columns?.map((column, idx) => (
                  <Draggable key={column._id} draggableId={column._id} index={idx}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{column.title}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <Modal isOpen={createModalOpen} onClose={closeModal} title={t('createBoardForm.create')}>
        <CreateBoardForm onSubmit={handleAdd} />
      </Modal>
    </>
  )
}

export default observer(BoardPageView)
