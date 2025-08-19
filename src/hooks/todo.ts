import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}

const api = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
  headers: {
    'content-type': 'application/json',
    apikey: 'KDT8_bcAWVpD8',
    username: 'KDT8_ParkYoungWoong'
  }
})

export function useCreateTodo() {
  return useMutation({
    mutationFn: async (data: { title: string }) => {
      await api.post('/', data)
    },
    onMutate: async () => {
      // 낙관적 업데이트 처리!
    },
    onSuccess: async () => {}, // try
    onError: async () => {}, // catch
    onSettled: async () => {} // finally
  })
}

export function useFetchTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await api.get<Todo[]>('/')
      return data
    }
  })
}

// 타입을 지정하는 행위! => Typing!
