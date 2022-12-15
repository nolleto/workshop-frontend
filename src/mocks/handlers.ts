import { rest } from 'msw'

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos/1', (req, res, ctx) => {
    const status = sessionStorage.getItem('get-todo')

    if (status === 'error') {
      throw new Error('Error')
    }

    if (status === 'empty-todo') {
      return res(ctx.status(200), ctx.json(null))
    }

    const todo = {
      userId: '1',
      id: '1',
      title: 'I have to do something',
      completed: true,
    }

    if (status === 'not-completed-todo') {
      return res(ctx.status(200), ctx.json({ ...todo, completed: false }))
    }

    return res(ctx.status(200), ctx.json(todo))
  }),
]
