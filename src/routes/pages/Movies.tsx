import { useState, Fragment, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { useMovieStore, useInfiniteMovies } from '@/hooks/movie'
import Loader from '@/components/Loader'

export default function Movies() {
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)
  const [inputText, setInputText] = useState(searchText)
  const observerRef = useRef<HTMLDivElement>(null)
  const { data, isFetching, fetchNextPage } = useInfiniteMovies()

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // 다음 페이지 가져와!
        fetchNextPage()
      }
    })
    if (observerRef.current) {
      io.observe(observerRef.current)
    }
    return () => {
      io.disconnect()
    }
  }, [])

  function fetchMovies() {
    setSearchText(inputText)
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              fetchMovies()
            }
          }}
        />
        <button onClick={() => fetchMovies()}>Search!</button>
      </div>
      {isFetching && <div>Loading...</div>}
      <ul>
        {data?.pages.map((page, index) => {
          return (
            <Fragment key={index}>
              {page?.Search.map(movie => {
                return (
                  <li key={movie.imdbID}>
                    <Link to={`/movies/${movie.imdbID}`}>
                      <h3>
                        {movie.Title}({movie.Year})
                      </h3>
                    </Link>
                  </li>
                )
              })}
            </Fragment>
          )
        })}
      </ul>

      <div
        ref={observerRef}
        className={`${isFetching ? 'hidden' : 'block'} h-[20px]`}></div>

      <div className="relative h-[70px]">
        <Loader />
        {isFetching && <Loader />}
      </div>
    </>
  )
}

// HTML 요소는 블록 요소, 인라인 요소
// 블록 요소 특징!
// 가로 너비(width) 최대한 늘어난다 => 100% X
// 세로 너비(height) 최대한 줄어든다 => auto, 0 인식!
