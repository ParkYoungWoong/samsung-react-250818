import { create } from 'zustand'
import { combine } from 'zustand/middleware'

// Zustand / 플러그인 <= 미들웨어

export const useMovieStore = create(combine())
