import { useState, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

import { ROUTES } from '@/router/routes'
import { Button, BoardCard, Loader, ErrorMessage, Search } from '@/components'
import useBoards from '@/hooks/useBoards'
import useModalStore from '@/hooks/useModalStore'
import useAuthStore from '@/hooks/useAuthStore'
import { Board } from '@/api'

function MainPageView() {
  const { t } = useTranslation()

  const authStore = useAuthStore()
  const boards = useBoards(authStore.userId)
  const modal = useModalStore()

  const [searchValue, setSearchValue] = useState('')
  const searchBoards = useMemo(
    () => filterBoardsByTitle(searchValue, boards.data),
    [boards.data, searchValue]
  )

  const { userId, isAuthenticated } = authStore

  if (!isAuthenticated || !userId) return <Navigate to={ROUTES.home} replace />

  if (boards.isLoading) return <Loader />

  if (boards.isError) return <ErrorMessage error={boards.error} />

  return (
    <>
      <div className="container mx-auto grid grid-cols-4 grid-rows-[100px_100px_minmax(900px)] gap-y-6">
        <Search onChange={setSearchValue} />

        <h2 className="col-span-3 !m-0 dark:text-slate-200">{t('boardsPage.boards')}</h2>

        <Button
          text={t('boardsPage.new')}
          onClick={() => modal.open({ name: 'add-board', data: { userId } })}
          className="justify-self-end"
        />

        <div className="col-span-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {searchBoards.map((board) => {
            return <BoardCard key={board._id} {...board} />
          })}
        </div>
      </div>
    </>
  )
}

export default observer(MainPageView)

function filterBoardsByTitle(search: string, boards?: Board[]) {
  if (!boards) return []
  return boards.filter((board) => board.title.toLowerCase().includes(search.toLowerCase()))
}
