import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoPostgresRespository } from '../repository/postgres/todo.postgres-repository';
import { ETodos } from '../interfaces/todo.interface';

describe('TodoService', () => {
  let service: TodoService;
  const mockRepository: Partial<TodoPostgresRespository> = {
    createItem: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: TodoPostgresRespository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  beforeAll(() => {});

  it('createdTodoItem should be created', () => {
    const todoItem = {
      id: '1',
      name: 'Buy groceries1',
      type: ETodos.EMPTY_DISHWASHER,
    };

    mockRepository.createItem = jest.fn().mockResolvedValue(todoItem);

    service.createTodo(todoItem).then((createdTodoItem) => {
      expect(createdTodoItem).toEqual(todoItem);
    });
  });
  it('should throw RestrictedTodosError', async () => {
    const todoItem = {
      id: '1',
      name: 'Buy groceries',
      type: ETodos.EMPTY_DISHWASHER,
    };

    mockRepository.createItem = jest.fn().mockResolvedValue(todoItem);

    await expect(
      service.createTodo({
        ...todoItem,
        type: ETodos.EMPTY_DISHWASHER,
        name: 'Buy groceries',
      }),
    ).rejects.toThrowError(
      new Error(
        'Emptying the dishwasher is not allowed in combination with buying groceries',
      ),
    );
  });
});
