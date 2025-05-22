import { Injectable } from '@nestjs/common';
import { IPost, IPostCreate } from '../interface/post.interface';
import { BlogRepositorySqlite } from '../repository/blog-repository-memory/blog-repository-sqlite.repository';
import { BlogPostNotFoundError } from '../errors/blog-post-errors';

@Injectable()
export class BlogService {
  constructor(private readonly repository: BlogRepositorySqlite) {}

  async getPosts(): Promise<IPost[]> {
    //TODO Input validation
    const posts = await this.repository.getPosts();
    if (!posts) {
      //TODO: type error handling (404, 500)
      throw new Error('No posts found');
    }
    return posts;
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
    console.log(postId);
    // TODO: Input validation
    const post = await this.repository.getPostById(postId);
    console.log(post);
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
