import { useEffect, useState } from 'react'

import type { Todo } from '../../service/todo'
import { todoService } from '../../service/todo'

type useFetchTodoResult = {
  isFetching: boolean;
  hasError: boolean;
  todo?: Todo;
  refetch: () => void;
}

export const useFetchTodo = (): useFetchTodoResult => {
  const [status, setStatus] = useState<'idle' | 'fetching' | 'loaded' | 'error'>('idle')
  const [todo, setTodo] = useState<Todo>()

  const refetch = () => {
    setStatus('fetching')

    todoService.getFirst()
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
