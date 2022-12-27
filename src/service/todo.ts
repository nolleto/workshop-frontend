type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export class TodoService {
  getFirst(): Promise<Todo> {
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
  }
}

export const todoService = new TodoService()
export type { Todo }
