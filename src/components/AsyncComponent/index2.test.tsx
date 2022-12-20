import { createAsyncComponent, defaultFetchTodo } from './index2'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('AsyncComponent2', () => {
  const createSuccessfullyFetchPromise = () => Promise.resolve({
    id: 1,
    title: 'My TODO',
    userId: 1,
    completed: false,
  })

  const createSuccessfullyComponent = () => {
    const fetchTodo = jest.fn(createSuccessfullyFetchPromise)
    const AsyncComponent = createAsyncComponent({ fetchTodo })

    return { AsyncComponent, fetchTodo }
  }

  it('calls fetch', async () => {
    const { AsyncComponent, fetchTodo } = createSuccessfullyComponent()
    render(<AsyncComponent />)

    expect(fetchTodo).toBeCalled()

    // Wait for component re-render
    await waitFor(() => {
      expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
    })
  })

  it('renders loading', async () => {
    const { AsyncComponent } = createSuccessfullyComponent()
    render(<AsyncComponent />)

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()

    // Wait for component re-render
    await waitFor(() => {
      expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
    })
  })

  describe('When fetch successfully', () => {
    it('renders todo info', async () => {
      const { AsyncComponent } = createSuccessfullyComponent()
      render(<AsyncComponent />)

      await waitFor(() => {
        expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(screen.getByText(/title: my todo/i)).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(screen.getByText(/completed: no/i)).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /re\-fetch/i })).toBeInTheDocument()
      })
    })

    describe('when click on Re-fetch button', () => {
      it('call fetch again', async () => {
        const { AsyncComponent, fetchTodo } = createSuccessfullyComponent()
        render(<AsyncComponent />)

        // Wait for component re-render
        await waitFor(() => {
          expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
        })
        fireEvent.click(screen.getByRole('button', { name: /re\-fetch/i }))

        expect(fetchTodo).toBeCalledTimes(2)

        // Wait for component re-render
        await waitFor(() => {
          expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
        })
      })
    })
  })

  describe('When fetch fails', () => {
    it('renders error message', async () => {
      const fetchTodo = jest.fn(() => Promise.reject('Fails'))
      const AsyncComponent = createAsyncComponent({ fetchTodo })
      render(<AsyncComponent />)

      await waitFor(() => {
        expect(screen.getByText(/something went wrong 😢/i)).toBeInTheDocument()
      })
    })
  })

  describe('.defaultFetchTodo', () => {
    it('calls fetch with url', () => {
      const fetch = jest.spyOn(window, 'fetch')
      defaultFetchTodo()

      expect(fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/todos/1')
    })
  })
})
