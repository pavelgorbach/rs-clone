import { makeAutoObservable } from 'mobx'

type Themes = 'dark'

const DEFAULT_THEME = 'dark'
export class ThemeStore {
  theme: Themes | undefined

  constructor() {
    makeAutoObservable(this)
    this.init()
  }

  private init() {
    const theme = localStorage.getItem('theme') as Themes
    this.theme = theme

    if (theme) {
      document.body.classList.add(theme)
    }
  }

  private reset() {
    localStorage.removeItem('theme')
    document.body.classList.remove(DEFAULT_THEME)
    this.theme = undefined
  }

  private set(theme: Themes) {
    this.theme = theme
    localStorage.setItem('theme', theme)
    document.body.classList.add(theme)
  }

  toggle() {
    if (this.theme === DEFAULT_THEME) {
      this.reset()
    } else {
      this.set('dark')
    }
  }
}
