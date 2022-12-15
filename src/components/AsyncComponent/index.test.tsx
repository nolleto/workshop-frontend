import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AsyncComponent from '.'

describe('<AsyncComponent />', () => {
  afterEach(() => {
    sessionStorage.clear()
    jest.clearAllMocks()
  })

  it('renders with Loading message by default', () => {
    render(<AsyncComponent />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  describe('when request fails', () => {
    beforeEach(() => {
      sessionStorage.setItem('get-todo', 'error')
    })

    it('renders with Error message', async () => {
      render(<AsyncComponent />)

      await waitFor(() => {
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
      })
    })
  })

  describe('when request succeed with empty Todo', () => {
    beforeEach(() => {
      sessionStorage.setItem('get-todo', 'empty-todo')
    })

    it('renders with Error message', async () => {
      render(<AsyncComponent />)

      await waitFor(() => {
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
      })
    })
  })

  describe('when request succeed with not completed Todo', () => {
    beforeEach(() => {
      sessionStorage.setItem('get-todo', 'not-completed-todo')
    })

    it('renders with not completed Todo data', async () => {
      render(<AsyncComponent />)

      await waitFor(() => {
        const todoId = screen.getByText(/id: 1/i)
        expect(todoId).toBeInTheDocument()
      })

      const todoTitle = screen.getByText(/title: I have to do something/i)
      const todoStatus = screen.getByText(/completed: No/i)

      expect(todoTitle).toBeInTheDocument()
      expect(todoStatus).toBeInTheDocument()
    })
  })

  describe('when request succeed', () => {
    it('renders with Todo data', async () => {
      render(<AsyncComponent />)

      await waitFor(() => {
        const todoId = screen.getByText(/id: 1/i)
        expect(todoId).toBeInTheDocument()
      })

      const todoTitle = screen.getByText(/title: I have to do something/i)
      const todoStatus = screen.getByText(/completed: Yes/i)

      expect(todoTitle).toBeInTheDocument()
      expect(todoStatus).toBeInTheDocument()
    })

    it('renders with Refetch button', async () => {
      render(<AsyncComponent />)

      await waitFor(() => {
        const refetchButton = screen.getByRole('button', { name: /re-fetch/i })
        expect(refetchButton).toBeInTheDocument()
      })
    })

    describe('when Refetch button is clicked', () => {
      it('fetches Todo again', async () => {
        const windowFetchSpy = jest.spyOn(window, 'fetch')

        render(<AsyncComponent />)

        await waitFor(() => {
          expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
        })

        expect(windowFetchSpy).toHaveBeenCalledTimes(1)

        const refetchButton = screen.getByRole('button', {
          name: /re-fetch/i,
        })

        userEvent.click(refetchButton)

        expect(windowFetchSpy).toHaveBeenCalledTimes(2)
        expect(windowFetchSpy).toHaveBeenLastCalledWith(
          'https://jsonplaceholder.typicode.com/todos/1'
        )
      })
    })
  })
})
