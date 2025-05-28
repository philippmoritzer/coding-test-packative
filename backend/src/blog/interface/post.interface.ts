export interface IPostCreate {
  title: string;
  content: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  likes: number;
  createdAt: Date;
  updatedAt?: Date;
}
