import { act, renderHook } from '@testing-library/react-hooks'

import { todoService } from '../../service/todo'
import { useFetchTodo } from '.'

describe('useFetchTodo', () => {
  const renderUseFetchTodo = () => renderHook(() => useFetchTodo())
  const getFirst = jest.spyOn(todoService, 'getFirst')

  const mockGetFirstSuccessfully = () => {
    getFirst.mockImplementation(() => Promise.resolve({
      id: 1,
      completed: true,
      title: 'My dear title',
      userId: 123
    }))
  }

  const mockGetFirstFails = () => {
    getFirst.mockImplementation(() => Promise.reject(new Error('Some error')))
  }

  beforeEach(() => {
    mockGetFirstSuccessfully()
  })

  it('calls todoService.getFirst on mount', async () => {
    const { waitForNextUpdate } = renderUseFetchTodo()

    expect(getFirst).toBeCalledTimes(1)

    // wait for hook states
    await waitForNextUpdate()
  })

  describe('when is requesting', () => {
    describe('.isFetching', () => {
      it('returns true', async () => {
        const { result, waitForNextUpdate } = renderUseFetchTodo()

        expect(result.current.isFetching).toBeTruthy()

        // wait for hook states
        await waitForNextUpdate()
      })
    })

    describe('.hasError', () => {
      it('returns false', async () => {
        const { result, waitForNextUpdate } = renderUseFetchTodo()

        expect(result.current.hasError).toBeFalsy()

        // wait for hook states
        await waitForNextUpdate()
      })
    })

    describe('.todo', () => {
      it('returns undefined', async () => {
        const { result, waitForNextUpdate } = renderUseFetchTodo()

        expect(result.current.todo).toBeUndefined()

        // wait for hook states
        await waitForNextUpdate()
      })
    })
  })

  describe('when request is finished successfully', () => {
    beforeEach(() => {
      mockGetFirstSuccessfully()
    })

    describe('.isFetching', () => {
      it('returns false', async () => {
        const { result, waitForNextUpdate } = renderUseFetchTodo()

        await waitForNextUpdate()

        expect(result.current.isFetching).toBeFalsy()
      })
    })

    describe('.hasError', () => {
      it('returns false', async () => {
        const { result, waitForNextUpdate } = renderUseFetchTodo()

        await waitForNextUpdate()

        expect(result.current.hasError).toBeFalsy()
      })
    })

    describe('.todo', () => {
      it('returns the todo', async () => {
        const { result, waitForNextUpdate } = renderUseFetchTodo()

        await waitForNextUpdate()

        expect(result.current.todo).toEqual({
          id: 1,
          completed: true,
          title: 'My dear title',
          userId: 123
        })
      })
    })
  })

  describe('when request fails', () => {
    beforeEach(() => {
      mockGetFirstFails()
    })

    describe('.isFetching', () => {
      it('returns false', async () => {
        const { result, waitForNextUpdate } = renderUseFetchTodo()

        await waitForNextUpdate()

        expect(result.current.isFetching).toBeFalsy()
      })
    })

    describe('.hasError', () => {
      it('returns true', async () => {
        const { result, waitForNextUpdate } = renderUseFetchTodo()

        await waitForNextUpdate()

        expect(result.current.hasError).toBeTruthy()
      })
    })

    describe('.todo', () => {
      it('returns undefined', async () => {
        const { result, waitForNextUpdate } = renderUseFetchTodo()

        await waitForNextUpdate()

        expect(result.current.todo).toBeUndefined()
      })
    })
  })

  describe('.refetch', () => {
    it('calls todoService.getFirst again', async () => {
      const { result, waitForNextUpdate } = renderUseFetchTodo()

      await waitForNextUpdate()

      act(() => {
        result.current.refetch()
      })

      expect(getFirst).toBeCalledTimes(2)

      // wait for hook states
      await waitForNextUpdate()
    })
  })
})
