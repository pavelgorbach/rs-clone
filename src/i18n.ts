import * as i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import translation from '../public/locales/en/translation.json'

export const defaultNS = 'translation'
export const resources = {
  en: {
    translation
  }
} as const

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: 'en',
    ns: ['translation'],
    load: 'languageOnly',
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })

export default i18n
