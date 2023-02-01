import { Button, BoardCard, Loader } from '@/components'
import useBoards from '@/hooks/useBoards'
import './style.css'

export default function Main() {
  const { isLoading, isError, error, data, addNew } = useBoards()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>An error occured: {error?.message}</div>
  }

  return (
    <>
      <input type="search" placeholder="search" />

      <h2>Boards</h2>

      <Button text="Create new board" onClick={addNew} />

      <div className="boards-list">
        {data?.map((board) => {
          return <BoardCard key={board.id} name={board.name} id={board.id} />
        })}
      </div>
    </>
  )
}
