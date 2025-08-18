import { NavLink } from 'react-router'

export default function Header() {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </header>
  )
}
