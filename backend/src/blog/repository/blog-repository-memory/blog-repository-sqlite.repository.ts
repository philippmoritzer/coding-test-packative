import { Injectable } from '@nestjs/common';
import { IBlogRepository } from '../blog.repository.interface';
import { IPost, IPostCreate } from '../../../blog/interface/post.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../../../blog/entity/blog-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogRepositorySqlite implements IBlogRepository {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}
  async getPostById(id: string): Promise<IPost | undefined> {
    const post = await this.blogPostRepository.findOne({ where: { id } });
    if (!post) {
      return undefined;
    }
    return post satisfies IPost;
  }

  async createPost(
    post: IPostCreate,
    createdBy: string,
  ): Promise<IPost | undefined> {
    const newPost = this.blogPostRepository.create({
      title: post.title,
      description: post.description,
      createdBy,
    });

    const savedPost = await this.blogPostRepository.save(newPost);
    return savedPost satisfies IPost;
  }
  async getPosts(): Promise<IPost[] | undefined> {
    const posts = await this.blogPostRepository.find();
    if (!posts) {
      return [];
    }
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      createdBy: post.createdBy,
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }
  async savePost(post: IPost): Promise<IPost | undefined> {
    const updatedPost = await this.blogPostRepository.save(post);
    return updatedPost satisfies IPost;
  }
}
