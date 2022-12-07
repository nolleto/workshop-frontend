import { useCounter } from '../../hooks/useCounter';

type CounterComponentProps = {
}

const CounterComponent = (props: CounterComponentProps) => {
  const { counter, decrement, increment } = useCounter()

  return (
    <div>
      <p>Counter: {counter}</p>

      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default CounterComponent
