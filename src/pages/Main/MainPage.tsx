import { useTranslation } from 'react-i18next'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import cx from 'classnames'

import { Button, BoardCard, Loader, CreateBoardForm, Modal } from '@/components'
import useMainPage from './useMainPage'

export default function Main() {
  const { t } = useTranslation()

  const {
    isLoading,
    isError,
    error,
    boards,
    createModalOpen,
    focusValue,
    closeModal,
    openModal,
    createBoard,
    updateBoard,
    deleteBoard,
    setSearchValue,
    setFocusValue
  } = useMainPage()

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
      <div className="container m-auto grid grid-cols-4 grid-rows-[100px_100px_minmax(900px)] gap-y-6">
        <div
          className={cx(
            'relative col-span-4 flex w-min rounded-lg border-2 pl-1 ',
            { 'border-gray-300': !focusValue },
            {
              ' border-purple-500': focusValue
            }
          )}
        >
          <input
            className="mr-1 w-60 border-none bg-gray-100 outline-none focus:ring-0"
            type="search"
            placeholder={t('boardPage.search')}
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

        <h2 className="col-span-3 !m-0">{t('boardPage.board')}</h2>

        <Button text={t('boardPage.new')} onClick={openModal} className="justify-self-end" />

        <div className="col-span-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {boards.map((board) => {
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

      <Modal isOpen={createModalOpen} onClose={closeModal} title={t('createBoardForm.create')}>
        <CreateBoardForm onSubmit={createBoard} />
      </Modal>
    </>
  )
}
