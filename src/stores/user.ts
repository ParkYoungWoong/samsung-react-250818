import { create } from 'zustand'
import {
  combine,
  subscribeWithSelector,
  persist,
  devtools
} from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useUserStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine(
            {
              user: {
                name: 'Neo',
                age: 22,
                address: {
                  city: 'Suwon',
                  emails: ['neo@heropy.dev', 'thesecon@gmail.com']
                }
              },
              birthYear: 0
            },
            set => {
              return {
                setFirstEmail: (email: string) => {
                  set(state => {
                    state.user.address.emails[0] = email
                  })
                  // const { user } = get()
                  // set({
                  //   user: {
                  //     ...user,
                  //     address: {
                  //       ...user.address,
                  //       emails: [email, ...user.address.emails[1]]
                  //     }
                  //   }
                  // })
                }
              }
            }
          )
        )
      ),
      {
        name: 'userStore'
        // storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

// useUserStore.subscribe(선택자_함수, 실행할_함수)
useUserStore.subscribe(
  state => state.user.age,
  age => {
    // const { birthYear } = useUserStore.getState()
    useUserStore.setState({
      birthYear: new Date().getFullYear() - age
    })
  }
)
