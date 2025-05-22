import { Module } from '@nestjs/common';
import { BlogController } from './controller/blog.controller';
import { BlogService } from './service/blog.service';
import { BlogRepositorySqlite } from './repository/blog-repository-memory/blog-repository-sqlite.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entity/blog-post.entity';

@Module({
  controllers: [BlogController],
  providers: [BlogService, BlogRepositorySqlite],
  imports: [TypeOrmModule.forFeature([BlogPost])],
})
export class BlogModule {}
