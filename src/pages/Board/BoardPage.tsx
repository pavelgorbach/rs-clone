import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { ROUTES } from '@/router/routes'
import { Loader, Button, Breadcrumbs, Column, TaskCard, ErrorMessage } from '@/components'
import useBoardPage from './useBoardPage'

function BoardPageView() {
  const { t } = useTranslation()

  const {
    isAuthenticated,
    userId,
    isLoading,
    isError,
    error,
    board,
    columns,
    onDragEnd,
    onAddColumnClick
  } = useBoardPage()

  if (!isAuthenticated || !userId) return <Navigate to={ROUTES.home} replace />

  if (isLoading) return <Loader />

  if (isError || !board) return <ErrorMessage error={error} />

  return (
    <>
      <Breadcrumbs title={board.title} className="container mx-auto" />

      <div className="flex h-2/5 flex-col overflow-x-scroll pb-4 pt-1 scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-purple-400 hover:scrollbar-thumb-purple-600">
        <div className="flex flex-1">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="board"
              type="COLUMN"
              direction="horizontal"
              isCombineEnabled={false}
            >
              {(provided) => (
                <div
                  className="inline-flex gap-2"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {columns?.map((column, idx) => (
                    <Draggable key={column._id} draggableId={column._id} index={idx}>
                      {(provided) => (
                        <div
                          className="flex"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Column column={column}>
                            <Droppable
                              droppableId={column._id}
                              type="TASK"
                              isCombineEnabled={false}
                            >
                              {(provided) => (
                                <div
                                  className="m-2 flex h-[48vh] w-64 flex-col gap-1 overflow-y-scroll border border-dashed border-gray-300 p-1 scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-purple-400 hover:scrollbar-thumb-purple-600"
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  {column.tasks?.map((task, idx) => (
                                    <Draggable key={task._id} draggableId={task._id} index={idx}>
                                      {(provided) => (
                                        <div
                                          className="w-11/12"
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <TaskCard key={task._id} task={task} />
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
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
            onClick={onAddColumnClick}
          />
        </div>
      </div>
    </>
  )
}

export default observer(BoardPageView)
