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

  const onDragEnd: OnDragEndResponder = async (result) => {
    if (!result.destination || !columns.data) return

    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      return
    }

    if (result.type === 'COLUMN') {
      const swaped = swap(columns.data, result.source.index, result.destination.index)
      updateColumnsSet.mutate(swaped)
      return
    }

    if (
      result.type === 'TASK' &&
      tasks.data &&
      result.source.droppableId === result.destination.droppableId
    ) {
      const sourceTasks = filterByColumn(tasks.data, result.source.droppableId)
      const swaped = swap(sourceTasks, result.source.index, result.destination.index)
      updateTasksSet.mutate(swaped)
      return
    }

    if (
      result.type === 'TASK' &&
      tasks.data &&
      result.source.droppableId !== result.destination.droppableId
    ) {
      const sourceTasks = filterByColumn(tasks.data, result.source.droppableId)
      const sortedSourceTasks = sortByOrder(sourceTasks)

      const [removed] = sortedSourceTasks.splice(result.source.index, 1)

      const destinationTasks = filterByColumn(tasks.data, result.destination.droppableId)
      const sortedDestinationTasks = sortByOrder(destinationTasks)
      sortedDestinationTasks.splice(result.destination.index, 0, {
        ...removed,
        columnId: result.destination.droppableId
      })

      const source = sortedSourceTasks.map((item, idx) => ({ ...item, order: idx }))
      const destination = sortedDestinationTasks.map((item, idx) => ({ ...item, order: idx }))

      updateTasksSet.mutate([...source, ...destination])
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

const swap = <T extends { order: number }>(arr: T[], index1: number, index2: number) => {
  const items = sortByOrder<T>(arr)
  const [removed] = items.splice(index1, 1)
  items.splice(index2, 0, removed)
  return items.map((item, idx) => ({ ...item, order: idx }))
}

const sortByOrder = <T extends { order: number }>(data: T[]) =>
  [...data].sort((a, b) => a.order - b.order)

const filterByColumn = <T extends { columnId: string }>(data: T[], columnId: string) =>
  data.filter((item) => item.columnId === columnId)
