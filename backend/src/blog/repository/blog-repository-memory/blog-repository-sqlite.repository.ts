import { Injectable, OnModuleInit } from '@nestjs/common';
import { IBlogRepository } from '../blog.repository.interface';
import { IPost, IPostCreate } from '../../../blog/interface/post.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../../../blog/entity/blog-post.entity';
import { Repository } from 'typeorm';
import { LoremIpsum } from 'lorem-ipsum';

@Injectable()
export class BlogRepositorySqlite implements IBlogRepository, OnModuleInit {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}

  // FIXME: Only for showcase purposes, adding mock posts
  async onModuleInit() {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });

    const posts: IPostCreate[] = Array.from({ length: 25 }, (_, i) => ({
      title: `Post ${25 - i}`,
      content: `Post ${25 - i}: ${lorem.generateParagraphs(2)}`,
    }));
    for (const post of posts) {
      const newPost = this.blogPostRepository.create({
        title: post.title,
        content: post.content,
        createdBy: 'system',
      });
      await this.blogPostRepository.save(newPost);
    }
  }

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
      content: post.content,
      createdBy,
    });

    const savedPost = await this.blogPostRepository.save(newPost);
    return savedPost satisfies IPost;
  }
  async getPosts(filter: {
    order: Record<string, 'ASC' | 'DESC'>;
    skip?: number;
    take?: number;
  }): Promise<IPost[] | undefined> {
    const posts = await this.blogPostRepository.find(filter);
    if (!posts) {
      return [];
    }
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
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

  async countPosts(): Promise<number> {
    const count = await this.blogPostRepository.count();
    return count;
  }
}
