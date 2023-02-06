import { Trans, useTranslation } from 'react-i18next'

import Typescript from '../assets/typescript.svg'
import React from '../assets/react.svg'
import rtk from '../assets/rtk.svg'
import tailwind from '../assets/tailwind.svg'
import jwt from '../assets/JWT.svg'
import reactHookForm from '../assets/rect_hook_form.svg'
import i18next from '../assets/i18next.svg'
import toastify from '../assets/toastify.svg'
import dnd from '../assets/beautiful_dnd.svg'

type StackDTO = {
  img: string
  text: string
}

const STACK: StackDTO[] = [
  { img: React, text: 'React' },
  { img: Typescript, text: 'Typescript' },
  { img: rtk, text: 'RTK | RTK Query' },
  { img: tailwind, text: 'Tailwind CSS' },
  { img: jwt, text: 'JWT-decode' },
  { img: reactHookForm, text: 'React-hook-form' },
  { img: i18next, text: 'React-i18next' },
  { img: toastify, text: 'React-Tostify' },
  { img: dnd, text: 'React-beautiful-dnd' }
]

export function DevStack() {
  const { t } = useTranslation()
  return (
    <section className="bg-white pt-5 pb-10">
      <div className="container m-auto border-l-2 border-l-purple-100 text-center lg:pl-3 lg:text-left">
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
          {STACK.map(({ text, img }, idx) => (
            <div
              key={idx}
              className={`not-prose flex flex-row items-center justify-between gap-3 rounded-full border-2 p-4`}
            >
              <div>{text}</div>
              <div className="w-10">
                <img src={img} alt="icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
