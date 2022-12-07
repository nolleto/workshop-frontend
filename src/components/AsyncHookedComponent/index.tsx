import { useFetchTodo } from '../../hooks/useFetchTodo'

type AsyncHookedComponentProps = {
}

const AsyncHookedComponent = (props: AsyncHookedComponentProps) => {
  const {
    hasError,
    isFetching,
    refetch,
    todo
  } = useFetchTodo()

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (hasError || !todo) {
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

export default AsyncHookedComponent
