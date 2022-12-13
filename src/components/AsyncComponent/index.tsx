import { useEffect, useState } from 'react'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

type AsyncComponentProps = {}

const fetchTodo = (): Promise<Todo> => {
  return fetch('https://jsonplaceholder.typicode.com/todos/1').then(
    (response) => response.json()
  )
}

const AsyncComponent = (_props: AsyncComponentProps) => {
  const [status, setStatus] = useState<
    'idle' | 'fetching' | 'loaded' | 'error'
  >('idle')
  const [todo, setTodo] = useState<Todo>()

  const refetch = () => {
    setStatus('fetching')

    fetchTodo()
      .then((fetchedTodo) => {
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

  if (status === 'fetching') {
    return <div>Loading...</div>
  }

  if (status === 'error' || !todo) {
    return <div>Something went wrong 😢</div>
  }

  return (
    <div>
      <p>Id: {todo.id}</p>
      <p>Title: {todo.title}</p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>

      <button onClick={refetch}>Re-fetch</button>
    </div>
  )
}

export default AsyncComponent
