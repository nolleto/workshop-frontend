import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import AsyncComponent from '.'

describe('AsyncComponent', () => {
    const fetch = jest.spyOn(window, 'fetch')

    beforeEach(() => {
        // @ts-ignore
        fetch.mockImplementation((url) => {
            console.log(`Invoking fetch with ${url}`)

            return Promise.resolve({
                json: () =>
                    Promise.resolve({
                        id: 1,
                        title: 'My TODO',
                        completed: false,
                    }),
            })
        })
    })

    it('calls fetch', async () => {
        render(<AsyncComponent />)

        expect(fetch).toBeCalledWith(
            'https://jsonplaceholder.typicode.com/todos/1'
        )

        // Wait for component re-render
        await waitFor(() => {
            expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
        })
    })

    it('renders loading', async () => {
        render(<AsyncComponent />)

        expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()

        // Wait for component re-render
        await waitFor(() => {
            expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
        })
    })

    describe('When fetch successfully', () => {
        it('renders todo info', async () => {
            render(<AsyncComponent />)

            await waitFor(() => {
                expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
            })

            expect(screen.getByText(/title: my todo/i)).toBeInTheDocument()
            expect(screen.getByText(/completed: no/i)).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: /re\-fetch/i })
            ).toBeInTheDocument()
        })

        describe('when click on Re-fetch button', () => {
            it('call fetch again', async () => {
                render(<AsyncComponent />)

                // Wait for component re-render
                await waitFor(() => {
                    expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
                })
                fireEvent.click(
                    screen.getByRole('button', { name: /re\-fetch/i })
                )

                expect(fetch).toBeCalledTimes(2)

                // Wait for component re-render
                await waitFor(() => {
                    expect(screen.getByText(/id: 1/i)).toBeInTheDocument()
                })
            })
        })
    })

    describe('When fetch fails', () => {
        beforeEach(() => {
            fetch.mockImplementation((url) => {
                console.log(`Invoking fetch with ${url}`)

                return Promise.reject(new Error('Fails'))
            })
        })

        it('renders error message', async () => {
            render(<AsyncComponent />)

            await waitFor(() => {
                expect(
                    screen.getByText(/something went wrong 😢/i)
                ).toBeInTheDocument()
            })
        })
    })
})
