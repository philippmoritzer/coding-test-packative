export interface IPost {
  id: string;
  title: string;
  description: string;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}
