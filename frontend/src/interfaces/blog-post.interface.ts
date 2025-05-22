export interface BlogPost {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostCardProps {
  blogPost: BlogPost;
}
