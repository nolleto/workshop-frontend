import { useEffect, useState } from 'react'

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type useFetchTodoResult = {
  isFetching: boolean;
  hasError: boolean;
  todo?: Todo;
  refetch: () => void;
}

const fetchTodo = (): Promise<Todo> => {
  return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
}

export const useFetchTodo = (): useFetchTodoResult => {
  const [status, setStatus] = useState<'idle' | 'fetching' | 'loaded' | 'error'>('idle')
  const [todo, setTodo] = useState<Todo>()

  const refetch = () => {
    setStatus('fetching')

    fetchTodo()
      .then(fetchedTodo => {
        setTodo(fetchedTodo)
        setStatus('loaded')
      })
      .catch(() => {
        setStatus('error')
      })
  }

  useEffect(() => {
    refetch()
  }, [])

  return {
    isFetching: status === 'fetching',
    hasError: status === 'error',
    todo,
    refetch,
  }
}
