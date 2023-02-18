import { useMemo } from 'react'
import { OnDragEndResponder } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'

import useAuthStore from '@/hooks/useAuthStore'
import useModalStore from '@/hooks/useModalStore'
import useBoard from '@/hooks/useBoard'
import useColumns from '@/hooks/useColumns'
import useTasks from '@/hooks/useTasks'
import useUpdateColumnsSet from '@/hooks/useUpdateColumnsSet'
import useUpdateTasksSet from '@/hooks/useUpdateTasksSet'

export default function useBoardPage() {
  const { id: boardId } = useParams() as { id: string }

  const { isAuthenticated, userId } = useAuthStore()

  const modal = useModalStore()

  const board = useBoard(boardId)
  const columns = useColumns(boardId)
  const tasks = useTasks(boardId)

  const onAddColumnClick = () => {
    if (!board.data?._id) return

    modal.open({
      name: 'add-column',
      data: { boardId: board.data?._id, order: columns.data?.length || 0 }
    })
  }

  const updateColumnsSet = useUpdateColumnsSet(boardId)
  const updateTasksSet = useUpdateTasksSet(boardId)

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination || !columns.data) return

    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      return
    }

    if (result.type === 'COLUMN') {
      const sorted = columns.data.sort((a, b) => a.order - b.order)
      const [removed] = sorted.splice(result.source.index, 1)
      sorted.splice(result.destination.index, 0, removed)
      const data = sorted.map((column, idx) => ({ ...column, order: idx }))

      updateColumnsSet.mutate(data)
      return
    }

    if (tasks.data && result.source.droppableId === result.destination.droppableId) {
      const sourceTasks = tasks.data.filter((task) => task.columnId === result.source.droppableId)
      const sortedSourceTasks = sourceTasks.sort((a, b) => a.order - b.order)

      const [removed] = sortedSourceTasks.splice(result.source.index, 1)
      sortedSourceTasks.splice(result.destination.index, 0, removed)
      const sourceData = sortedSourceTasks.map((task, idx) => ({ ...task, order: idx }))
      updateTasksSet.mutate(sourceData)
      return
    }
  }

  const columnsWithTasks = useMemo(() => {
    const withTasks = columns.data?.map((column) => {
      const columnTasks = tasks.data?.filter((task) => task.columnId === column._id)
      const sortedTasks = columnTasks?.sort((a, b) => a.order - b.order)

      return {
        ...column,
        userId,
        tasks: sortedTasks
      }
    })

    return withTasks?.sort((a, b) => a.order - b.order)
  }, [columns.data, tasks.data, userId])

  return {
    isAuthenticated,
    userId,
    isLoading: board.isLoading || columns.isLoading || tasks.isLoading,
    isError: board.isError || columns.isError || tasks.error,
    error: board.error || columns.error || tasks.error,
    board: board.data,
    columns: columnsWithTasks,
    onDragEnd,
    onAddColumnClick
  }
}
