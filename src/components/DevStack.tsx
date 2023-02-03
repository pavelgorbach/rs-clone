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
  return (
    <>
      <h3>Development</h3>
      <p>
        This Project Management App is created as final task of{' '}
        <a href="https://rs.school/js/">RS School Frontend course</a> in accordance with
      </p>
      <div className="flex flex-wrap gap-3">
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
    </>
  )
}
