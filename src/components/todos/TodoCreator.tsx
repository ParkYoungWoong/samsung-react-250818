import { useCreateTodo } from '@/hooks/todo'
import { useState } from 'react'

export default function TodoCreator() {
  const { isPending, mutate } = useCreateTodo()
  const [title, setTitle] = useState('')

  function handleCreate() {
    mutate({ title })
    setTitle('')
  }

  return (
    <div>
      <input
        disabled={isPending}
        className="rounded-md border-1 border-gray-300"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) return
          if (e.key === 'Enter') {
            handleCreate()
          }
        }}
      />
      <button
        disabled={isPending}
        onClick={() => handleCreate()}>
        추가!
      </button>
    </div>
  )
}
