import { useCountStore } from '@/stores/count'

export default function About() {
  const count = useCountStore(state => state.count)
  const double = useCountStore(state => state.double)
  const increase = useCountStore(state => state.increase)
  return (
    <>
      <h1>About!!</h1>
      <h2 onClick={increase}>
        {count} / {double}
      </h2>
    </>
  )
}
