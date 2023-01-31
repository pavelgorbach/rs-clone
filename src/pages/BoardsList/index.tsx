import { useState } from "react"

import { Button, BoardCard } from "@/components"

import './style.css'

let counter = 0

export default function BoardsList() {
  const [boards, setBoards] = useState<{ id: number; name: string }[]>([])

  const onAddBoard = () => {
    setBoards((state) => {
      counter++
      return [...state, { id: counter, name: 'Board ' + counter }]
    })
  }

  return (
    <>
      <input type="search" placeholder="search" />
      <div className="boards-list-header">
        <h2>Boards List</h2>
        <Button text="Create new board" onClick={onAddBoard} />
      </div>

      <div className="boards-list">
        {boards.map((board) => {
          return <BoardCard key={board.id} name={board.name} id={board.id} />
        })}
      </div>
    </>
  )
}
