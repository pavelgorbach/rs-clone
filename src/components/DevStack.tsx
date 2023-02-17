import { Trans, useTranslation } from 'react-i18next'

const STACK = [
  { src: 'icons/vite.svg', text: 'Vite.js' },
  { src: 'icons/react.svg', text: 'React' },
  { src: 'icons/typescript.svg', text: 'Typescript' },
  { src: 'icons/react-query.svg', text: 'React Query' },
  { src: 'icons/tailwind.svg', text: 'Tailwind CSS' },
  { src: 'icons/jwt.svg', text: 'JWT-decode' },
  { src: 'icons/react-hook-form.svg', text: 'React-hook-form' },
  { src: 'icons/i18next.svg', text: 'React-i18next' },
  { src: 'icons/toastify.svg', text: 'React-Tostify' },
  { src: 'icons/beautiful-dnd.svg', text: 'React-beautiful-dnd' }
]

export function DevStack() {
  const { t } = useTranslation()

  return (
    <section className="bg-white pt-5 pb-10 dark:bg-slate-800 dark:text-slate-200">
      <div className="container m-auto border-l-2 border-l-purple-100 text-center dark:border-l-purple-800 lg:pl-3 lg:text-left">
        <h3>{t('devStack.development')}</h3>

        <p>
          <Trans i18nKey="devStack.project">
            This Project Management App is created as final task of
            <a className="text-purple-800" href="https://rs.school/js/">
              RS School Frontend course
            </a>
          </Trans>
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {STACK.map(({ text, src }, idx) => (
            <div
              key={idx}
              className={`not-prose flex flex-row items-center justify-between gap-3 border-2 py-1 px-2 dark:border-slate-500`}
            >
              <div>{text}</div>
              <div className="w-10">
                <img src={src} alt="icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
