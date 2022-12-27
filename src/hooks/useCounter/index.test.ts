import { act, renderHook } from '@testing-library/react-hooks'

import { useCounter } from '.'

describe('useCounter', () => {
  describe('.counter', () => {
    it('returns 0', () => {
      const { result } = renderHook(() => useCounter())

      expect(result.current.counter).toBe(0)
    })
  })

  describe('.decrement', () => {
    it('returns a function', () => {
      const { result } = renderHook(() => useCounter())

      expect(result.current.decrement).toEqual(expect.any(Function))
    })

    describe('when called', () => {
      it('decrements .counter', () => {
        const { result } = renderHook(() => useCounter())

        expect(result.current.counter).toBe(0)

        act(() => {
          result.current.decrement()
        })

        expect(result.current.counter).toBe(-1)
      })
    })
  })

  describe('.increment', () => {
    it('returns a function', () => {
      const { result } = renderHook(() => useCounter())

      expect(result.current.increment).toEqual(expect.any(Function))
    })

    describe('when called', () => {
      it('increments .counter', () => {
        const { result } = renderHook(() => useCounter())

        expect(result.current.counter).toBe(0)

        act(() => {
          result.current.increment()
        })

        expect(result.current.counter).toBe(1)
      })
    })
  })
})
