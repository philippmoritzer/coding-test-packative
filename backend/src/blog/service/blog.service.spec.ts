import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { IPost, IPostCreate } from '../interface/post.interface';
import { randomUUID } from 'crypto';
import { BlogRepositorySqlite } from '../repository/blog-repository-memory/blog-repository-sqlite.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from '../entity/blog-post.entity';

const mockPostInput: IPostCreate = {
  title: 'Test Post',
  description: 'This is a test post',
};

describe('BlogService', () => {
  let service: BlogService;
  let mockDbPost: IPost;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [BlogPost],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([BlogPost]),
      ],
      providers: [BlogService, BlogRepositorySqlite],
    }).compile();

    service = module.get<BlogService>(BlogService);

    mockDbPost = await service.createPost(mockPostInput, randomUUID());
  });

  it('Happy path creating a post', async () => {
    const result = await service.createPost(mockPostInput, randomUUID());
    expect(result).toHaveProperty('id');
  });

  it('Happy path getting all posts', async () => {
    const result = await service.getPosts();
    expect(result).toHaveLength(1);
  });
  it('Happy path liking a post', async () => {
    const result = await service.likePost(mockDbPost.id);
    expect(result.likes).toBe(1);
  });
  it('Should throw error when post not found', async () => {
    await expect(service.likePost('non-existing-id')).rejects.toThrowError(
      new Error('Blog post with id non-existing-id not found'),
    );
  });
});
