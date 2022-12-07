import { useState } from 'react';

type CounterComponentProps = {
}

const CounterComponent = (props: CounterComponentProps) => {
  const [counter, setCounter] = useState(0)
  const increment = () => {
    setCounter(currentCounter => currentCounter + 1)
  }
  const decrement = () => {
    setCounter(currentCounter => currentCounter - 1)
  }

  return (
    <div>
      <p>Counter: {counter}</p>

      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default CounterComponent
