import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { ROUTES } from '@/router'
import { Button, CreateColumnForm, Loader, Modal, Column, Breadcrumbs } from '@/components'
import useBoardPage from './useBoardPage'

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
    addColumn,
    updateColumn,
    removeColumn,
    openCreateColumnModal,
    closeCreateColumnModal,
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

      <div className="flex flex-1 flex-col overflow-auto pb-4 pt-1">
        <div className="flex flex-1">
          <DragDropContext onDragEnd={onDragComplete}>
            <Droppable droppableId="drag-drop-list" direction="horizontal">
              {(provided) => (
                <div className="flex gap-2" {...provided.droppableProps} ref={provided.innerRef}>
                  {columns?.map((column, idx) => (
                    <Draggable key={column._id} draggableId={column._id} index={idx}>
                      {(provided) => (
                        <div
                          className="flex"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Column {...column} onUpdate={updateColumn} onDelete={removeColumn} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Button
            text={t('boardPage.newColumn')}
            className="ml-4 self-start"
            onClick={openCreateColumnModal}
          />
        </div>

        <Modal isOpen={createModalOpen} onClose={closeCreateColumnModal} title={t('common.create')}>
          <CreateColumnForm onSubmit={addColumn} />
        </Modal>
      </div>
    </>
  )
}

export default observer(BoardPageView)
