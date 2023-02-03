import { Greeting, Features, DevStack } from '@/components'

export default function Home() {
  return (
    <>
      <div className="container m-auto">
        <Greeting />
      </div>

      <div className="bg-white pt-5 pb-10">
        <div className="container m-auto border-l-2 border-l-purple-100 pl-3">
          <Features />
        </div>
      </div>

      <div className="bg-white pt-5 pb-10">
        <div className="container m-auto border-l-2 border-l-purple-100 pl-3">
          <DevStack />
        </div>
      </div>

      <div className="bg-white pt-5 pb-10">
        <div className="container m-auto border-l-2 border-l-purple-100 pl-3">
          <h3>Our Team</h3>
          <ul>
            <li>pavelgorbach</li>
            <li>maxxxer</li>
            <li>kirillmolotkov</li>
          </ul>
        </div>
      </div>
    </>
  )
}
