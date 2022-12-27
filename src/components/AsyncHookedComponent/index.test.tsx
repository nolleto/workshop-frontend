import { fireEvent, render, screen } from '@testing-library/react'

import AsyncHookedComponent from '.'
import { useFetchTodo } from '../../hooks/useFetchTodo'

jest.mock('../../hooks/useFetchTodo')

describe('AsyncHookedComponent', () => {
  beforeEach(() => {
    (useFetchTodo as jest.Mock).mockImplementation(() => ({
      isFetching: true,
    }))
  })

  it('renders loading', async () => {
    render(<AsyncHookedComponent />)

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()
  })

  describe('When fetch successfully', () => {
    const refetch = jest.fn()

    beforeEach(() => {
      (useFetchTodo as jest.Mock).mockImplementation(() => ({
        isFetching: false,
        todo: { id: 1, title: 'my todo', completed: false },
        refetch,
      }))
    })

    it('renders todo info', async () => {
      render(<AsyncHookedComponent />)

      expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
      expect(screen.getByText(/title: my todo/i)).toBeInTheDocument()
      expect(screen.getByText(/completed: no/i)).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /re\-fetch/i })
      ).toBeInTheDocument()
    })

    describe('when click on Re-fetch button', () => {
      it('call fetch again', async () => {
        render(<AsyncHookedComponent />)

        expect(screen.getByText(/id: 1/i)).toBeInTheDocument()

        fireEvent.click(
          screen.getByRole('button', { name: /re\-fetch/i })
        )

        expect(refetch).toBeCalledTimes(1)
      })
    })
  })

  describe('When fetch fails', () => {
    beforeEach(() => {
      (useFetchTodo as jest.Mock).mockImplementation(() => ({
        isFetching: false,
        hasError: true,
      }))
    })

    it('renders error message', async () => {
      render(<AsyncHookedComponent />)

      expect(
        screen.getByText(/something went wrong 😢/i)
      ).toBeInTheDocument()
    })
  })
})
