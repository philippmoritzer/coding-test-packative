export interface IPostCreate {
  title: string;
  description: string;
}

export interface IPost {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  likes: number;
  createdAt: Date;
  updatedAt?: Date;
}
