import { useParams } from 'react-router-dom'

import { Button, Column, Loader } from '@/components'
import useColumns from '@/hooks/useColumns'
import './style.css'

export default function Board() {
  const { id } = useParams()

  const { isLoading, isError, error, data, addNew } = useColumns()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>An error occured: {error?.message}</div>
  }

  return (
    <>
      <h2>Board {id}</h2>
      <Button text="Create new column" onClick={addNew} />

      <div className="columns-list">
        {data?.map((column) => {
          return <Column key={column.id} name={column.name} id={column.id} />
        })}
      </div>
    </>
  )
}
