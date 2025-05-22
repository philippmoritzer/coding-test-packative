import { ApiProperty } from '@nestjs/swagger';

export class BlogPostOutputDTO {
  @ApiProperty({ description: 'Unique identifier for the blog post' })
  id: string;

  @ApiProperty({ description: 'Title of the blog post' })
  title: string;
  @ApiProperty({ description: 'Content of the blog post' })
  description: string;
  @ApiProperty({ description: 'Number of likes for the blog post' })
  likes: number;
}

export class BlogPostsListOutputDTO {
  @ApiProperty({ type: [BlogPostOutputDTO] })
  posts: BlogPostOutputDTO[];
}
