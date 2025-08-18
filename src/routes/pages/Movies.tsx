import { useEffect } from 'react'
import { useMovieStore } from '@/stores/movie'

export default function Movies() {
  // 한 번에 1개씩만 훅 호출로 꺼내서 사용!
  const fetchMovies = useMovieStore(state => state.fetchMovies)
  const movies = useMovieStore(state => state.movies)
  const isLoading = useMovieStore(state => state.isLoading)

  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.imdbID}>
              <h3>
                {movie.Title}({movie.Year})
              </h3>
            </li>
          )
        })}
      </ul>
    </>
  )
}
