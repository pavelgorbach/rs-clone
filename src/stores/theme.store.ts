import { makeAutoObservable } from 'mobx'

export class ThemeStore {
  theme: 'dark' | 'light' = 'light'

  constructor() {
    makeAutoObservable(this)
  }

  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark'
  }
}
