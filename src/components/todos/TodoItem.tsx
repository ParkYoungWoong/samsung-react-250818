import { useUpdateTodo } from '@/hooks/todo'
import type { Todo } from '@/hooks/todo'
import { useState } from 'react'

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const { isPending, mutateAsync } = useUpdateTodo()

  function onEditMode() {
    setIsEditing(true)
  }
  function offEditMode() {
    setIsEditing(false)
  }
  async function handleSave() {
    if (title === todo.title) return
    await mutateAsync({
      ...todo,
      title
    })
    offEditMode()
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input
            disabled={isPending}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            disabled={isPending}
            onClick={offEditMode}>
            취소
          </button>
          <button
            disabled={isPending}
            onClick={handleSave}>
            저장
          </button>
          <button disabled={isPending}>삭제</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            defaultChecked={todo.done}
          />
          <div>{todo.title}</div>
          <button onClick={onEditMode}>수정</button>
        </>
      )}
    </li>
  )
}
