import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useMovieStore } from '@/stores/movie'

export default function MovieDetails() {
  const { movieId } = useParams()
  const fetchMovie = useMovieStore(state => state.fetchMovie)
  const movie = useMovieStore(state => state.currentMovie)

  useEffect(() => {
    fetchMovie(movieId)
  }, [])

  return (
    <div>
      {movie && (
        <>
          <div>
            <img
              src={movie.Poster.replace('SX300', 'SX1000')}
              alt={movie.Title}
            />
          </div>
          <div>
            <h1>{movie.Title}</h1>
            <h1>{movie.Plot}</h1>
          </div>
        </>
      )}
    </div>
  )
}
