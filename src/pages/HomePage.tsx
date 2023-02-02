import { Greeting, Features } from '@/components'

export default function Home() {
  return (
    <>
      <Greeting />

      <Features />

      <h3>Development Stack</h3>
      <ol>
        <li>TypeScript</li>
        <li>React</li>
        <li>React Query</li>
        <li>React Hook Form</li>
        <li>Tailwind css</li>
        <li>React-i18next</li>
        <li>React-Toastify</li>
        <li>React-beautiful-dnd</li>
      </ol>

      <h3>Team</h3>
      <ul>
        <li>pavelgorbach</li>
        <li>maxxxer</li>
        <li>kirillmolotkov</li>
      </ul>
    </>
  )
}
