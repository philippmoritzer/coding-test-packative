/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { IPost } from '../interface/post.interface';
import { BlogPostgresRepository } from '../repository/blog-repository-postgres/blog.postgres.repository';

const mockPostInput: Omit<IPost, 'id'> = {
  title: 'Test Post',
  description: 'This is a test post',
  likes: 0,
};

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogService, BlogPostgresRepository],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('Happy path creating a post', async () => {
    const result = await service.createPosts(mockPostInput);
    expect(result).toHaveProperty('id');
    //TODO: Redact the id from the result
  });

  it('Happy path getting all posts', async () => {
    const result = await service.getPosts();
    expect(result).toHaveLength(2);
  });
  it('Happy path liking a post', async () => {
    const result = await service.likePost('1', '1');
    expect(result.likes).toBe(1);
  });
});
