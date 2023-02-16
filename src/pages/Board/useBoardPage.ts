import { useMemo } from 'react'
import { OnDragEndResponder } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'

import { Column, Task } from '@/api/types'
import useModal from '@/hooks/useModal'
import useBoard from '@/hooks/useBoard'
import useColumns from '@/hooks/useColumns'
import useTasks from '@/hooks/useTasks'
import useAddColumn from '@/hooks/useAddColumn'
import useDeleteColumn from '@/hooks/useDeleteColumn'
import useUpdateColumn from '@/hooks/useUpdateColumn'
import useUpdateColumnsSet from '@/hooks/useUpdateColumnsSet'
import useAddTask from '@/hooks/useAddTask'
import useDeleteTask from '@/hooks/useDeleteTask'
import useUpdateTask from '@/hooks/useUpdateTask'

type Modals =
  | { name: 'add-column'; data: { boardId: string } }
  | { name: 'edit-column'; data: Column }
  | { name: 'delete-column'; data: { boardId: string; columnId: string } }
  | {
      name: 'add-task'
      data: { userId: string; boardId: string; columnId: string; order: number }
    }
  | { name: 'edit-task'; data: Task }
  | { name: 'delete-task'; data: { boardId: string; columnId: string; taskId: string } }

export default function useBoardPage() {
  const { id: boardId } = useParams() as { id: string }

  const { modal, openModal, closeModal } = useModal<Modals>()

  const board = useBoard(boardId)
  const columns = useColumns(boardId)
  const tasks = useTasks(boardId)

  const addColumn = useAddColumn(closeModal)
  const deleteColumn = useDeleteColumn(closeModal)
  const updateColumn = useUpdateColumn(closeModal)
  const updateColumnsSet = useUpdateColumnsSet(boardId, closeModal)
  const addTask = useAddTask(closeModal)
  const updateTask = useUpdateTask(closeModal)
  const deleteTask = useDeleteTask(closeModal)

  const onDragColumnComplete: OnDragEndResponder = (result) => {
    if (!result.destination || !columns.data) return

    const sorted = columns.data.sort((a, b) => a.order - b.order)
    const [removed] = sorted.splice(result.source.index, 1)
    sorted.splice(result.destination.index, 0, removed)
    const data = sorted.map((column, idx) => ({ ...column, order: idx }))

    updateColumnsSet.mutate(data)
  }

  const columnsWithTasks = useMemo(() => {
    const withTasks = columns.data?.map((column) => {
      return {
        ...column,
        tasks: tasks.data?.filter((task) => task.columnId === column._id)
      }
    })

    return withTasks?.sort((a, b) => a.order - b.order)
  }, [columns.data, tasks.data])

  return {
    isLoading: board.isLoading || columns.isLoading || tasks.isLoading,
    isError: board.isError || columns.isError || tasks.error,
    error: board.error || columns.error || tasks.error,
    board: board.data,
    columns: columnsWithTasks,
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
  }
}
