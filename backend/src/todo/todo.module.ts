import { Module } from '@nestjs/common';
import { TodoService } from './service/todo.service';
import { TodoController } from './controller/todo.controller';
import { TodoPostgresRespository } from './repository/postgres/todo.postgres-repository';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TodoPostgresRespository],
  imports: [],
})
export class TodoModule {}
