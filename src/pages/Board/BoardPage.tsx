import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { ROUTES } from '@/router'
import { Loader, Button, Breadcrumbs, Column, TaskCard, ErrorMessage } from '@/components'
import useAuthStore from '@/hooks/useAuthStore'
import useModalStore from '@/hooks/useModalStore'
import useBoardPage from './useBoardPage'

function BoardPageView() {
  const { t } = useTranslation()
  const { isAuthenticated, userId } = useAuthStore()
  const modalStore = useModalStore()

  const { isLoading, isError, error, board, columns, onDragColumnComplete } = useBoardPage()

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
                            onEdit={() => modalStore.open({ name: 'edit-column', data: column })}
                            onDelete={() =>
                              modalStore.open({
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
                                    onEdit={() =>
                                      modalStore.open({ name: 'edit-task', data: task })
                                    }
                                    onDelete={() =>
                                      modalStore.open({
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
                                modalStore.open({
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
            onClick={() =>
              modalStore.open({
                name: 'add-column',
                data: { boardId: board._id, order: columns?.length || 0 }
              })
            }
          />
        </div>
      </div>
    </>
  )
}

export default observer(BoardPageView)
