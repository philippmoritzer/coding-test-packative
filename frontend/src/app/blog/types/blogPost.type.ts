export type BlogPost = {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostCardProps = {
  blogPost: BlogPost;
};
