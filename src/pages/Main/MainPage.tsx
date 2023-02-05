import { Button, BoardCard, Loader, CreateBoardForm, Modal } from '@/components'
import useMainPage from './useMainPage'
import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Board } from '@/api'
import cx from 'classnames'
export default function Main() {
  const {
    isLoading,
    isError,
    error,
    data,
    createModalOpen,
    closeModal,
    openModal,
    createBoard,
    updateBoard,
    deleteBoard
  } = useMainPage()
  const [searchValue, setSearchValue] = useState('')
  const [focusValue, setFocusValue] = useState(false)
  const searchBoards = (data: Array<Board> | undefined) => {
    return data?.filter((board) => board.name.toLowerCase().includes(searchValue))
  }
  let currentData = data

  if (searchBoards(data)) {
    currentData = searchBoards(data)
  }
  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>An error occured: {error?.message}</div>
  }

  return (
    <>
      <div className=" container m-auto grid grid-cols-6 grid-rows-[100px_100px_minmax(900px)] gap-y-6">
        <div
          className={cx(
            'relative col-span-6 flex w-min rounded-lg border-2 pl-1 ',
            { 'border-gray-300': !focusValue },
            {
              ' border-purple-500': focusValue
            }
          )}
        >
          <input
            className="mr-1 w-60 border-none bg-gray-100 outline-none focus:ring-0"
            type="search"
            placeholder="Search"
            onChange={(event) => {
              setSearchValue(event.target.value)
            }}
            onFocus={() => setFocusValue(true)}
            onBlur={() => setFocusValue(false)}
          />
          <div className={cx('absolute inset-y-3 right-1', { hidden: focusValue })}>
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-300" />
          </div>
        </div>
        <h2 className="!m-0">Boards</h2>

        <Button text="Create new board" onClick={openModal} className="col-start-6 col-end-7" />

        <div className="col-span-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {currentData?.map((board) => {
            return (
              <BoardCard
                key={board.id}
                name={board.name}
                id={board.id}
                description={board.description}
                onDelete={deleteBoard}
                onUpdate={updateBoard}
              />
            )
          })}
        </div>
      </div>

      <Modal isOpen={createModalOpen} onClose={closeModal} title="Create">
        <CreateBoardForm onSubmit={createBoard} />
      </Modal>
    </>
  )
}
