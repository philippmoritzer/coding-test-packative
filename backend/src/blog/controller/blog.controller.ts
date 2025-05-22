import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogPostsListOutputDTO } from '../dto/blog-post-output.dto';
import { BlogService } from '../service/blog.service';
import { BlogPostInputDTO } from '../dto/blog-post-input.dto';
import { IPost } from '../interface/post.interface';
import { ApiResponse } from '@nestjs/swagger';

@Controller('blog')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @ApiResponse({
    status: 200,
  })
  @Get('posts')
  async getPosts(): Promise<BlogPostsListOutputDTO> {
    const serviceRes = await this.blogService.getPosts();
    const res: BlogPostsListOutputDTO = {
      posts: serviceRes,
    };
    return res;
  }

  @Post('posts')
  createPosts(@Body() blogPostInputDTO: BlogPostInputDTO) {
    const { title, description } = blogPostInputDTO;
    const inputPost: Omit<IPost, 'id'> = {
      title,
      description,
      likes: 0,
    };
    return this.blogService.createPosts(inputPost);
  }

  @Patch('posts/:id/like')
  likePost() {}
}
