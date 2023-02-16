import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { ROUTES } from '@/router'
import {
  Loader,
  Button,
  Modal,
  Breadcrumbs,
  Column,
  CreateColumnForm,
  EditColumnForm,
  TaskCard,
  CreateTaskForm,
  EditTaskForm,
  ErrorMessage
} from '@/components'
import useAuthStore from '@/hooks/useAuthStore'
import useBoardPage from './useBoardPage'

function BoardPageView() {
  const { t } = useTranslation()
  const { isAuthenticated, userId } = useAuthStore()

  const {
    isLoading,
    isError,
    error,
    board,
    columns,
    modal,
    addColumn,
    updateColumn,
    deleteColumn,
    addTask,
    updateTask,
    deleteTask,
    openModal,
    closeModal,
    onDragColumnComplete
  } = useBoardPage()

  if (!isAuthenticated || !userId) return <Navigate to={ROUTES.home} replace />

  if (isLoading) return <Loader />

  if (isError || !board) return <ErrorMessage error={error} />

  return (
    <>
      <Breadcrumbs title={board.title} />

      <div className="flex flex-1 flex-col overflow-auto pb-4 pt-1">
        <div className="flex flex-1">
          <DragDropContext onDragEnd={onDragColumnComplete}>
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
                          <Column
                            title={column.title}
                            onEdit={() => openModal({ name: 'edit-column', data: column })}
                            onDelete={() =>
                              openModal({
                                name: 'delete-column',
                                data: { boardId: board._id, columnId: column._id }
                              })
                            }
                          >
                            <div className="m-2 flex w-64 flex-1 flex-col gap-1 border border-dashed border-gray-300 p-1">
                              {column.tasks?.map((task) => {
                                return (
                                  <TaskCard
                                    key={task._id}
                                    title={task.title}
                                    description={task.description}
                                    onEdit={() => openModal({ name: 'edit-task', data: task })}
                                    onDelete={() =>
                                      openModal({
                                        name: 'delete-task',
                                        data: {
                                          boardId: board._id,
                                          columnId: column._id,
                                          taskId: task._id
                                        }
                                      })
                                    }
                                  />
                                )
                              })}
                            </div>

                            <Button
                              text={t('column.addTask')}
                              onClick={() =>
                                openModal({
                                  name: 'add-task',
                                  data: {
                                    userId,
                                    boardId: board._id,
                                    columnId: column._id,
                                    order: column.tasks?.length || 0
                                  }
                                })
                              }
                            />
                          </Column>
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
            onClick={() => openModal({ name: 'add-column', data: { boardId: board._id } })}
          />
        </div>
      </div>

      {modal.name === 'add-column' && (
        <Modal isOpen={true} onClose={closeModal} title={t('common.create')}>
          <CreateColumnForm
            onSubmit={(formData) =>
              addColumn.mutate({
                ...modal.data,
                ...formData,
                order: columns?.length || 0
              })
            }
          />
        </Modal>
      )}

      {modal.name === 'edit-column' && (
        <Modal isOpen={true} onClose={closeModal} title={t('common.edit')}>
          <EditColumnForm
            title={modal.data.title}
            onSubmit={(formData) =>
              updateColumn.mutate({
                boardId: modal.data.boardId,
                columnId: modal.data._id,
                order: modal.data.order,
                ...formData
              })
            }
          />
        </Modal>
      )}

      {modal.name === 'delete-column' && (
        <Modal isOpen={true} onClose={closeModal} title={t('common.confirmation')}>
          <div className="prose">
            <p>{t('column.question')}</p>

            <div className="flex justify-between">
              <Button type="success" text={t('common.cancel')} onClick={closeModal} />
              <Button
                type="error"
                text={t('common.delete')}
                onClick={() => deleteColumn.mutate(modal.data)}
              />
            </div>
          </div>
        </Modal>
      )}

      {modal.name === 'add-task' && (
        <Modal isOpen={true} onClose={closeModal}>
          <CreateTaskForm onSubmit={(formData) => addTask.mutate({ ...modal.data, ...formData })} />
        </Modal>
      )}

      {modal.name === 'edit-task' && (
        <Modal isOpen={true} onClose={closeModal}>
          <EditTaskForm
            title={modal.data.title}
            description={modal.data.description}
            onSubmit={(formData) =>
              updateTask.mutate({
                boardId: modal.data.boardId,
                columnId: modal.data.columnId,
                taskId: modal.data._id,
                userId: modal.data.userId,
                users: modal.data.users,
                order: modal.data.order,
                ...formData
              })
            }
          />
        </Modal>
      )}

      {modal.name === 'delete-task' && (
        <Modal isOpen={true} onClose={closeModal} title={t('common.confirmation')}>
          <div className="prose">
            <p>{t('column.question')}</p>

            <div className="flex justify-between">
              <Button type="success" text={t('common.cancel')} onClick={closeModal} />
              <Button
                type="error"
                text={t('common.delete')}
                onClick={() => deleteTask.mutate(modal.data)}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default observer(BoardPageView)
