import { Injectable } from '@nestjs/common';
import { IPost, IPostCreate } from '../interface/post.interface';
import { BlogRepositorySqlite } from '../repository/blog-repository-memory/blog-repository-sqlite.repository';
import { BlogPostNotFoundError } from '../errors/blog-post-errors';

@Injectable()
export class BlogService {
  constructor(private readonly repository: BlogRepositorySqlite) {}

  async getPosts(filter?: {
    skip?: number;
    take?: number;
    order?: string;
  }): Promise<{ posts: IPost[]; total: number }> {
    const order = filter?.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const skip = filter?.skip ?? 0;
    const take = filter?.take ?? 10;

    const [posts, total] = await Promise.all([
      this.repository.getPosts({
        order: { createdAt: order },
        skip,
        take,
      }),
      this.repository.countPosts(),
    ]);
    if (!posts) {
      throw new Error('No posts found');
    }
    return { posts, total };
  }

  async getPostByid(id: string): Promise<IPost> {
    // TODO: Input validation
    const post = await this.repository.getPostById(id);
    if (!post) {
      throw new BlogPostNotFoundError(id);
    }
    return post;
  }

  async createPost(post: IPostCreate, createdBy: string): Promise<IPost> {
    // TODO: Input validation
    const createdPost = await this.repository.createPost(post, createdBy);
    //TODO: type error handling (422, 500)
    if (!createdPost) {
      throw new Error('Post not created');
    }
    return createdPost;
  }

  async likePost(postId: string): Promise<IPost> {
    // TODO: Input validation
    const post = await this.repository.getPostById(postId);
    if (!post) {
      throw new BlogPostNotFoundError(postId);
    }

    //TODO: make sure user only likes once
    post.likes += 1;
    const likedPost = await this.repository.savePost(post);

    if (!likedPost) {
      //TODO: type error handling (422, 500)
      throw new Error('Post not saved');
    }
    return likedPost;
  }
}
