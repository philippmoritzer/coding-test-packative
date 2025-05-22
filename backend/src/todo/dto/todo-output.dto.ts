import { ApiProperty } from '@nestjs/swagger';
import { ETodos } from '../interfaces/todo.interface';

export class TodoOutputDtoItem {
  @ApiProperty({
    description: 'Unique identifier for the todo item',
    example: '12345',
    minLength: 3,
    maxLength: 255,
  })
  id: string;
  @ApiProperty({
    description: 'Type of the todo item',
    enum: ETodos,
    example: 'EMPTY_DISHWASHER',
  })
  type: string;

  @ApiProperty({
    description: 'Name of the todo item',
    example: 'Buy groceries',
    minLength: 3,
    maxLength: 255,
  })
  name: string;
}

export class TodoOutputDtoList {
  @ApiProperty({
    description: 'List of todo items',
    type: [TodoOutputDtoItem],
  })
  todoItems: TodoOutputDtoItem[];
}
