import { Injectable } from '@nestjs/common';
import { IPost } from '../interface/post.interface';
import { BlogPostgresRepository } from '../repository/blog-repository-postgres/blog.postgres.repository';

@Injectable()
export class BlogService {
  constructor(private readonly repository: BlogPostgresRepository) {}

  async getPosts(): Promise<IPost[]> {
    const posts: IPost[] = await this.repository.getPosts();
    return posts;
  }

  async createPosts(post: Omit<IPost, 'id'>): Promise<IPost> {
    // TODO: Input validation
    const createdPost: IPost = await this.repository.createPost(post);
    return createdPost;
  }

  async likePost(postId: string, userId: string): Promise<IPost> {
    // TODO: Input validation
    const likedPost: IPost = await this.repository.likePosts(postId, userId);
    return likedPost;
  }
}
