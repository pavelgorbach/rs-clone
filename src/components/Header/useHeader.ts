import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/router'
import useAuthStore from '@/hooks/useAuthStore'

export default function useHeader() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const authStore = useAuthStore()

  const [theme, setTheme] = useState(false)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const onAddBoard = () => {
    console.log('add new board')
  }

  const onSignOut = () => {
    authStore.unauth()
  }

  const goToSignInPage = () => {
    navigate(ROUTES.signIn)
  }

  const goToSignUpPage = () => {
    navigate(ROUTES.signUp)
  }

  return {
    i18n,
    theme,
    isAuthenticated: authStore.isAuthenticated,
    t,
    setTheme,
    changeLanguage,
    onAddBoard,
    onSignOut,
    goToSignInPage,
    goToSignUpPage
  }
}
