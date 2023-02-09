import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'

import { Button, Loader } from '@/components'
import useBoardPage from './useBoardPage'

export default function Board() {
  const { t } = useTranslation()

  const { boardId, isLoading, isError, error, data, addNew, onDragComplete } = useBoardPage()

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
      <h2>
        {t('boardPage.board')} {boardId}
      </h2>
      <Button text={t('boardPage.new')} onClick={addNew} />

      <DragDropContext onDragEnd={onDragComplete}>
        <Droppable droppableId="drag-drop-list" direction="horizontal">
          {(provided) => (
            <div className="flex gap-4" {...provided.droppableProps} ref={provided.innerRef}>
              {data?.map((column, idx) => (
                <Draggable key={column._id} draggableId={column.title} index={idx}>
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
    </>
  )
}
