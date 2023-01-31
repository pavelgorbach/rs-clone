import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <h3>Welcome!</h3>
      <p>The simple but efficient way to organize, plan and track progress on your projects.</p>
      <Link to="boards-list">Get started</Link>

      <h3>Features</h3>
      <ul>
        <li>Create any number of boards and tasks</li>
        <li>Find tasks through search</li>
        <li>Track personal tasks in your profile</li>
        <li>Expand tasks by adding checklists</li>
        <li>Change the order of tasks and columns</li>
        <li>Elaborate tasks by attaching images</li>
      </ul>
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