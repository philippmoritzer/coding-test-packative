import { IPost, IPostCreate } from '../interface/post.interface';

export interface IBlogRepository {
  getPostById(id: string): Promise<IPost | undefined>;
  createPost(post: IPostCreate, createdBy: string): Promise<IPost | undefined>;
  getPosts(filter: {
    order: { createdAt: 'ASC' | 'DESC' };
    skip?: number;
    take?: number;
  }): Promise<IPost[] | undefined>;
  savePost(post: IPost): Promise<IPost | undefined>;
  countPosts(): Promise<number>;
}
