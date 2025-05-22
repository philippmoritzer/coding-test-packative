export interface TodoItem {
  id: number;
  name: string;
  type: string;
}

export interface TodoList {
  todos: TodoItem[];
}
