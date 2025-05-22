import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoItemInputDto } from '../dto/todo-input.dto';
import { TodoService } from '../service/todo.service';

@ApiTags('Todo list')
@UsePipes(
  new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true,
    whitelist: true,
  }),
)
@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodoItem(@Body() todoItemInputDto: TodoItemInputDto) {
    const inputTodoItem: Omit<TodoItemInputDto, 'id'> = {
      name: todoItemInputDto.name,
      type: todoItemInputDto.type,
    };
    const todoItem = await this.todoService.createTodo(inputTodoItem);
    return todoItem;
  }
}
