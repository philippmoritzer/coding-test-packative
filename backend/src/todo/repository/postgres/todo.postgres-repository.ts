import { Injectable } from '@nestjs/common';
import { ITodoRepository } from '../todo.repository.interface';
import { ETodos, ITodoItem } from '../../../todo/interfaces/todo.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class TodoPostgresRespository implements ITodoRepository {
  getItems(): Promise<ITodoItem[]> {
    return Promise.resolve([
      {
        id: randomUUID(),
        type: ETodos.EMPTY_DISHWASHER,
        name: 'Todo 1 description',
      },
      {
        id: randomUUID(),
        type: ETodos.EMPTY_DISHWASHER,
        name: 'Todo 1 description',
      },
    ]);
  }
  createItem(todos: Omit<ITodoItem, 'id'>): Promise<ITodoItem> {
    // insert into database and retrive the id
    const id = randomUUID();
    return Promise.resolve({ ...todos, id });
  }
}
