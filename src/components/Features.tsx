import { ReactNode } from 'react'

import IconInfinite from '../assets/infinite.svg'
import Checks from '../assets/checks.svg'
import Cursor from '../assets/cursor.svg'
import Img from '../assets/img.svg'
import Search from '../assets/search.svg'
import Shelves from '../assets/shelves.svg'

type feature = {
  text: string
  img: string
  position: 'left' | 'right'
}

const FEATURES: feature[] = [
  {
    text: 'Create any number of boards and tasks',
    img: IconInfinite,
    position: 'right'
  },
  {
    text: 'Track personal tasks in your profile',
    img: Checks,
    position: 'left'
  },
  {
    text: 'Expand tasks by adding checklists',
    img: Cursor,
    position: 'right'
  },
  {
    text: 'Change the order of tasks and columns',
    img: Img,
    position: 'left'
  },
  {
    text: 'Find tasks through search',
    img: Search,
    position: 'right'
  },
  {
    text: 'Elaborate tasks by attaching images',
    img: Shelves,
    position: 'left'
  }
]

export function Features() {
  return (
    <section className="w-full">
      <h3>Features</h3>
      <div className="m-auto grid w-2/3 grid-cols-2 gap-2">
        {FEATURES.map((feature, index) => (
          <Feature text={feature.text} position={feature.position} key={index}>
            {<feature.img />}
          </Feature>
        ))}
      </div>
    </section>
  )
}

type FeatureProps = {
  children: ReactNode
  text: string
  position: 'left' | 'right'
}

function Feature({ text, position, children }: FeatureProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 ${
        position === 'left' ? 'flex-row-reverse' : 'flex-row'
      } rounded-full border-2`}
    >
      <div className="px-10">{text}</div>
      <div className="px-10">{children}</div>
    </div>
  )
}