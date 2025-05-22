/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { TodoPostgresRespository } from '../repository/postgres/todo.postgres-repository';
import { ETodos, ITodoItem } from '../interfaces/todo.interface';
import { RestrictedTodosError } from '../error/todo.errors';

@Injectable()
export class TodoService {
  constructor(
    private readonly someUseCaseRepository: TodoPostgresRespository,
  ) {}

  async createTodo(todoItem: Omit<ITodoItem, 'id'>): Promise<ITodoItem> {
    // TODO: input validation if the service is meant to be abstracted

    if (
      todoItem.type === ETodos.EMPTY_DISHWASHER &&
      todoItem.name === 'Buy groceries'
    ) {
      throw new RestrictedTodosError(
        'Emptying the dishwasher is not allowed in combination with buying groceries',
      );
    }

    const res = await this.someUseCaseRepository.createItem(todoItem);
    const createdTodoItem: ITodoItem = res;
    return createdTodoItem;
  }

  async getTodo(): Promise<ITodoItem[]> {
    const res = await this.someUseCaseRepository.getItems();
    const todoItem: ITodoItem[] = res;
    return todoItem;
  }
}
