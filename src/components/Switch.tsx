import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
type Props = {
  enabled: boolean
  onClick: (cheched: boolean) => void
}

export function Switch({ enabled, onClick }: Props) {
  return (
    <div className="w-8">
      {!enabled && (
        <SunIcon
          onClick={() => onClick(true)}
          className="h-8 w-8 cursor-pointer text-purple-500 hover:text-purple-400"
        />
      )}
      {enabled && (
        <MoonIcon
          onClick={() => onClick(false)}
          className="h-7 w-7 cursor-pointer text-purple-500 hover:text-purple-400"
        />
      )}
    </div>
  )
}
