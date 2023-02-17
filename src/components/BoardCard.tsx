import { Link } from 'react-router-dom'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'react-tooltip'

import { Board } from '@/api'
import { ROUTES } from '@/router'
import useModalStore from '@/hooks/useModalStore'

export function BoardCard(board: Board) {
  const { t } = useTranslation()

  const modalStore = useModalStore()

  return (
    <>
      <Link to={`${ROUTES.boards}/${board._id}`}>
        <div className="mt-3 bg-white p-3 shadow-sm">
          <h3 className="!mt-0 mb-2">{board.title}</h3>

          <div className="flex justify-end gap-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                modalStore.open({ name: 'edit-board', data: board })
              }}
            >
              <PencilIcon
                id={`tooltip-edit-${board._id}`}
                className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-green-100 hover:text-green-500"
              />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault()
                modalStore.open({ name: 'delete-board', data: { boardId: board._id } })
              }}
            >
              <TrashIcon
                id={`tooltip-delete-${board._id}`}
                className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-red-100 hover:text-red-500"
              />
            </button>
          </div>
        </div>
      </Link>

      <Tooltip
        anchorId={`tooltip-edit-${board._id}`}
        place="bottom"
        content={t('tooltip.editBoardName')}
        className="!p-1.5 !text-xs"
      />

      <Tooltip
        anchorId={`tooltip-delete-${board._id}`}
        place="bottom"
        content={t('tooltip.deleteBoard')}
        className="!p-1.5 !text-xs"
      />
    </>
  )
}
