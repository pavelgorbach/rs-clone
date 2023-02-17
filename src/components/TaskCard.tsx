import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'

import { Task } from '@/api'
import useModalStore from '@/hooks/useModalStore'

export function TaskCard({ task }: { task: Task }) {
  const { t } = useTranslation()

  const modal = useModalStore()

  const onEdit = () => {
    modal.open({ name: 'edit-task', data: task })
  }

  const onDelete = () => {
    modal.open({
      name: 'delete-task',
      data: {
        boardId: task.boardId,
        columnId: task.columnId,
        taskId: task._id
      }
    })
  }

  return (
    <div className="relative bg-white p-1">
      <div>{task.title}</div>

      <div className="font-thin">{task.description}</div>

      <div className="absolute top-1 right-2 w-56 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button>
            <Bars3Icon
              className="ml-2 -mr-1 h-5 w-5 text-gray-300 hover:text-purple-400"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-36 origin-top-right divide-y divide-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onEdit}
                    className={cx(
                      {
                        'bg-purple-500 text-white': active,
                        'text-gray-900': !active
                      },
                      'group flex w-full items-center px-2 py-2 text-sm'
                    )}
                  >
                    <PencilIcon className="mr-4 h-5 w-5 text-green-400" />
                    {t('common.edit')}
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onDelete}
                    className={cx(
                      {
                        'bg-purple-500 text-white': active,
                        'text-gray-900': !active
                      },
                      'group flex w-full items-center px-2 py-2 text-sm'
                    )}
                  >
                    <TrashIcon className="mr-4 h-5 w-5 text-red-400" />
                    {t('common.delete')}
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
