import { ApiProperty } from '@nestjs/swagger';

export class BlogPostOutputDTO {
  @ApiProperty({ description: 'Unique identifier for the blog post' })
  id: string;

  @ApiProperty({ description: 'Title of the blog post' })
  title: string;

  @ApiProperty({ description: 'Content of the blog post' })
  content: string;

  @ApiProperty({ description: 'The user id the post was created by' })
  createdBy: string;

  @ApiProperty({ description: 'Date when the blog post was created' })
  createdAt: Date;

  @ApiProperty({ description: 'Date when the blog post was last updated' })
  updatedAt?: Date;

  @ApiProperty({ description: 'Number of likes for the blog post' })
  likes: number;
}

export class BlogPostsListOutputDTO {
  @ApiProperty({ type: [BlogPostOutputDTO] })
  posts: BlogPostOutputDTO[];

  @ApiProperty({ description: 'Total number of blog posts' })
  total: number;
}
