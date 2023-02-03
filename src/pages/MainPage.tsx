import { Button, BoardCard, Loader } from '@/components'
import useBoards from '@/hooks/useBoards'

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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {data?.map((board) => {
          return (
            <BoardCard
              key={board.id}
              name={board.name}
              id={board.id}
              description={board.description}
            />
          )
        })}
      </div>
    </>
  )
}
