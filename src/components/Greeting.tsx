import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/constants'
import { Banner, Button } from '@/components'

export function Greeting() {
  const navigate = useNavigate()

  const goToMainPage = () => {
    navigate(ROUTES.main)
  }

  return (
    <section className="gap container m-auto mb-10 flex flex-col-reverse items-center justify-between md:flex-row">
      <div className="pl-3">
        <h1>
          Manage <span className="text-purple-600">any</span> task
        </h1>
        <p>The simple but efficient way to organize, plan and track progress on your projects.</p>

        <Button text={'Get started'} onClick={goToMainPage} />
      </div>

      <Banner />
    </section>
  )
}
