import { Button } from '../Button'
import Banner from './Banner'

export default function GreetinPage() {
  return (
    <div className="w-full bg-gray-100">
      <div className="m-auto flex w-full items-center justify-between">
        <div className="pl-5">
          <h1>
            Manage <span className="text-purple-600">any</span> task
          </h1>
          <p>The simple but efficient way to organize, plan and track progress on your projects.</p>
          <Button text={'Get started'} onClick={() => (location.href = '#')} />
        </div>
        <Banner />
      </div>
    </div>
  )
}
