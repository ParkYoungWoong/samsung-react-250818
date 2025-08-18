import { create } from 'zustand'
import { combine } from 'zustand/middleware'

// for TS
export const useCountStore = create(
  combine(
    {
      count: 0,
      double: 0
    },
    (set, get) => {
      return {
        increase: () => {
          const { count } = get()
          set({
            count: count + 1
          })
        },
        decrease: () => {}
      }
    }
  )
)
