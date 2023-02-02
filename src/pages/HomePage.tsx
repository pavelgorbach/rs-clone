import { Greeting, Features, DevStack } from '@/components'

export default function Home() {
  return (
    <>
      <Greeting />
      <Features />
      <DevStack />

      <h3>Team</h3>
      <ul>
        <li>pavelgorbach</li>
        <li>maxxxer</li>
        <li>kirillmolotkov</li>
      </ul>
    </>
  )
}
