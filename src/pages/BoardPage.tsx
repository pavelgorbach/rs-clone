import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'

import { Button, Loader } from '@/components'
import useColumns from '@/hooks/useColumns'

export default function Board() {
  const { id } = useParams()
  const { t } = useTranslation()

  const { isLoading, isError, error, data, addNew, onDragComplete } = useColumns()

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
        {t('boardPage.board')} {id}
      </h2>
      <Button text={t('boardPage.new')} onClick={addNew} />

      <DragDropContext onDragEnd={onDragComplete}>
        <Droppable droppableId="drag-drop-list" direction="horizontal">
          {(provided) => (
            <div className="flex gap-4" {...provided.droppableProps} ref={provided.innerRef}>
              {data?.map((column, idx) => (
                <Draggable key={column.id} draggableId={column.name} index={idx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p>{column.name}</p>
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
