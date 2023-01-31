import { useState } from "react"
import { useParams } from "react-router-dom"

import { Button, Column } from "@/components"

import './style.css'

let counter = 0

export default function Board() {
  const [columns, setColumns] = useState<{ id: number; name: string }[]>([])

  const { id } = useParams()

  const onAddColumn = () => {
    setColumns((state) => {
      counter++
      return [...state, { id: counter, name: 'Column ' + counter }]
    })
  }

  return (
    <>
      <div className="board-header">
        <h2>Board {id}</h2>
        <Button text="Create new column" onClick={onAddColumn} />
      </div>

      <div className="columns-list">
        {columns.map((column) => {
          return <Column key={column.id} name={column.name} id={column.id} />
        })}
      </div>
    </>
  )
}