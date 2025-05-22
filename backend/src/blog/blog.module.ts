import { Module } from '@nestjs/common';
import { BlogController } from './controller/blog.controller';
import { BlogService } from './service/blog.service';
import { BlogPostgresRepository } from './repository/blog-repository-postgres/blog.postgres.repository';

@Module({
  controllers: [BlogController],
  providers: [BlogService, BlogPostgresRepository],
  imports: [],
})
export class BlogModule {}
