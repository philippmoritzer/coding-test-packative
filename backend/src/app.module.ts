import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [TodoModule, BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
