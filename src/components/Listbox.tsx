import { Fragment } from 'react'
import { Listbox as UListbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type Props = {
  value: string
  options: string[]
  onChange(value: string): void
}

export function Listbox({ value, options, onChange }: Props) {
  return (
    <div className="w-16">
      <UListbox value={value} onChange={onChange}>
        <div className="relative z-10 mt-1">
          <UListbox.Button className="relative w-full cursor-default bg-gray-100 py-2 pl-3 pr-5 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-slate-700 dark:text-slate-200 sm:text-sm">
            <span className="block truncate">{value}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </UListbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UListbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-700 sm:text-sm">
              {options.map((option, idx) => (
                <UListbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1 pl-8 pr-2 ${
                      active
                        ? 'bg-purple-100 text-purple-900 dark:bg-slate-500'
                        : 'text-gray-900 dark:text-slate-200'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-purple-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </UListbox.Option>
              ))}
            </UListbox.Options>
          </Transition>
        </div>
      </UListbox>
    </div>
  )
}
