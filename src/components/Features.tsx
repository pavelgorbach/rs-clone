import { ReactNode } from 'react'

import IconInfinite from '../assets/infinite.svg'

export function Features() {
  return (
    <>
      <h3>Features</h3>

      <div className="grid grid-cols-2">
        <div>
          <Feature text="Create any number of boards and tasks">
            <IconInfinite />
          </Feature>

          <Feature text="Find tasks through search">
            <IconInfinite />
          </Feature>

          <div>Track personal tasks in your profile</div>
        </div>

        <div>
          <div>Expand tasks by adding checklists</div>
          <div>Change the order of tasks and columns</div>
          <div>Elaborate tasks by attaching images</div>
        </div>
      </div>
    </>
  )
}

type FeatureProps = {
  children: ReactNode
  text: string
  left?: boolean
}

function Feature({ text, left = false, children }: FeatureProps) {
  return (
    <div className={`flex items-center p-4 ${left ? 'flex-row-reverse' : 'flex-row'}`}>
      <div>{text}</div>
      <div>{children}</div>
    </div>
  )
}
