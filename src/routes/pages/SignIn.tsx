// React Router Protected Route (보호된 경로 설정!)
// 로그인을 하지 않으면, 영화 검색 페이지로 접근 불가!
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

export default function SignIn() {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // '?redirectTo=/movies&abc=123&xyz=456'
  const redirectTo = searchParams.get('redirectTo')

  // React.이벤트타입<대상요소타입>
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (id && pw) {
      const token = id + pw
      localStorage.setItem('accessToken', token)
      navigate(redirectTo || '/')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <input
        type="password"
        value={pw}
        onChange={e => setPw(e.target.value)}
      />
      <button type="submit">Sign In!</button>
    </form>
  )
}

// class Abc {}
// const abc = new Abc()
