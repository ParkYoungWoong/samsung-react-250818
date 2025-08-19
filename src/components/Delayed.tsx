import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const name = 'Delayed'

export default function Delayed({ wait }: { wait: number }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['delay', wait],
    queryFn: async () => {
      const { data } = await axios(`https://api.heropy.dev/v0/delay?t=${wait}`)
      return data
    }
  })

  return (
    <>
      <h2>{JSON.stringify(data)}</h2>
      <h3>{JSON.stringify(isLoading)}</h3>
      <button onClick={() => refetch()}>다시 가져와!</button>
    </>
  )
}
