import { Injectable } from '@nestjs/common';
import { IBlogRepository } from '../blog.interface';
import { IPost } from 'src/blog/interface/post.interface';
import { randomUUID } from 'crypto';
@Injectable()
export class BlogPostgresRepository implements IBlogRepository {
  constructor() {}
  createPost(post: Omit<IPost, 'id'>): Promise<IPost> {
    // SQL INSERT INTO
    // postgres.create() => PostEntity
    return Promise.resolve({
      id: randomUUID(),
      title: post.title,
      description: post.description,
      likes: 0,
    });
  }
  getPosts(): Promise<IPost[]> {
    return Promise.resolve([
      {
        id: randomUUID(),
        title: 'Test Post',
        description: 'This is a test post',
        likes: 0,
      },
      {
        id: randomUUID(),
        title: 'Test Post 2',
        description: 'This is a test post 2',
        likes: 0,
      },
    ]);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async likePosts(id: string, userId: string): Promise<IPost> {
    //rerive the post from the database
    return Promise.resolve({
      id,
      title: 'Test Post',
      description: 'This is a test post',
      likes: 1,
    });
  }
}
