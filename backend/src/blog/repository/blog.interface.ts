import { IPost } from '../interface/post.interface';

export interface IBlogRepository {
  createPost(post: Omit<IPost, 'id'>): Promise<IPost>;
  getPosts(): Promise<IPost[]>;
  likePosts(id: string, userId: string): Promise<IPost>;
}
