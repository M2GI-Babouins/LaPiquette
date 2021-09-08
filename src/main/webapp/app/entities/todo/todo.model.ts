export interface ITodo {
  id?: number;
  name?: string | null;
  count?: number | null;
}

export class Todo implements ITodo {
  constructor(public id?: number, public name?: string | null, public count?: number | null) {}
}

export function getTodoIdentifier(todo: ITodo): number | undefined {
  return todo.id;
}
