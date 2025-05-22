import { ITodoItem } from '../interfaces/todo.interface';

export interface ITodoRepository {
  getItems(): Promise<ITodoItem[]>;
  createItem(todos: ITodoItem): Promise<ITodoItem>;
}
