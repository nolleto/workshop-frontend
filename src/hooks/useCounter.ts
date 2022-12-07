import { useState } from "react";

type useCounterResult = {
  counter: number;
  decrement: () => void;
  increment: () => void;
}


export const useCounter = (): useCounterResult => {
  const [counter, setCounter] = useState(0)
  const increment = () => {
    setCounter(currentCounter => currentCounter + 1)
  }
  const decrement = () => {
    setCounter(currentCounter => currentCounter - 1)
  }

  return {
    counter,
    decrement,
    increment,
  }
}
