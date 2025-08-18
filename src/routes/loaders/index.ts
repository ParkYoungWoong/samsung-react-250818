import { redirect } from 'react-router'

export async function requiresAuth({ request }: { request: Request }) {
  const token = localStorage.getItem('accessToken')
  // await new Promise(resolve => setTimeout(resolve, 3000))
  if (token) {
    return true
  }
  const url = new URL(request.url) // 'http://localhost:5173/movies?s=베트맨'
  const redirectTo = url.pathname + url.search // '/movies?s=베트맨'
  return redirect(`/signin?redirectTo=${encodeURIComponent(redirectTo)}`)
}

export async function guestOnly() {
  const token = localStorage.getItem('accessToken')
  if (token) {
    return redirect('/')
  }
  return true
}
