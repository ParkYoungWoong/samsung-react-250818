import { useCreateTodo } from '@/hooks/todo'
import { useState } from 'react'

export default function TodoCreator() {
  const { isPending, mutate } = useCreateTodo()
  const [title, setTitle] = useState('')

  return (
    <div>
      <input
        disabled={isPending}
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) return
          if (e.key === 'Enter') {
            mutate({ title })
          }
        }}
      />
      <button
        disabled={isPending}
        onClick={() => mutate({ title })}>
        추가!
      </button>
    </div>
  )
}
