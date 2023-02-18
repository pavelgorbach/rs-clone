import { observer } from 'mobx-react-lite'
import SunIcon from '@heroicons/react/24/solid/SunIcon'
import MoonIcon from '@heroicons/react/24/solid/MoonIcon'
import useThemeStore from '@/hooks/useThemeStore'

function ThemeSwitchView() {
  const theme = useThemeStore()
  const toggle = () => theme.toggle()

  if (theme.theme === 'dark') {
    return (
      <div className="flex w-8 items-center justify-center">
        <SunIcon
          onClick={toggle}
          className="h-8 w-8 cursor-pointer text-purple-500 hover:text-purple-400"
        />
      </div>
    )
  }

  return (
    <div className="flex w-8 items-center justify-center">
      <MoonIcon
        onClick={toggle}
        className="h-5 w-5 cursor-pointer text-purple-500 hover:text-purple-400"
      />
    </div>
  )
}

export const ThemeSwitch = observer(ThemeSwitchView)
