import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import axios from 'axios'

export interface MoviesResponse {
  Search: Search[]
  totalResults: string
  Response: string
}
export interface Search {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export const useMovieStore = create(
  combine(
    {
      movies: [] as Search[], // 추론 안 되기 때문에 별도로 타입 단언(Assertion)!
      searchText: '',
      isLoading: false
    },
    set => {
      return {
        fetchMovies: async () => {
          set({
            isLoading: true
          })
          const { data } = await axios<MoviesResponse>(
            'https://omdbapi.com?apikey=7035c60c&s=batman'
          )
          set({
            movies: data.Search,
            isLoading: false
          })
        }
      }
    }
  )
)
