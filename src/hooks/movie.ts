import { useQuery, queryOptions, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { uniqBy } from 'lodash-es'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface MoviesResponse {
  Search: Movie[]
  totalResults: string
  Response: string
}
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
export interface MovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
export interface Rating {
  Source: string
  Value: string
}

export const useMovieStore = create(
  combine(
    {
      searchText: ''
    },
    set => ({
      setSearchText: (searchText: string) => set({ searchText })
    })
  )
)
export function useMovies() {
  const searchText = useMovieStore(state => state.searchText)
  const queryClient = useQueryClient()
  const options = queryOptions({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      if (searchText.length < 3) return []
      const { data } = await axios<MoviesResponse>(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
      )
      return data.Search
    },
    enabled: Boolean(searchText),
    staleTime: 1000 * 60 * 60, // 1h
    select: movies => {
      return uniqBy(movies, 'imdbID')
    }
  })
  const result = useQuery(options)
  return {
    ...result,
    fetchQuery: () => queryClient.fetchQuery(options)
  }
}

export function useMovie(movieId?: string) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      if (!movieId) return
      const { data } = await axios<MovieDetails>(
        `https://omdbapi.com?apikey=7035c60c&i=${movieId}`
      )
      return data
    },
    staleTime: 1000 * 60 * 60 // 1h
  })
}
