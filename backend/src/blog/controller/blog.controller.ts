/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  BlogPostOutputDTO,
  BlogPostsListOutputDTO,
} from '../dto/blog-post-output.dto';
import { BlogService } from '../service/blog.service';
import { BlogPostInputDTO } from '../dto/blog-post-input.dto';
import { IPostCreate } from '../interface/post.interface';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from '../../shared/decorators/permission.decorator';
import { Auth } from '../../shared/decorators/auth.decorator';
import { GetUserId } from '../..//shared/decorators/get-user-id.decorator';
import { isUUID } from 'class-validator';

@ApiTags('blog')
@Controller('blog')
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Auth()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiResponse({
    status: 200,
    description: 'List of blog posts',
    type: BlogPostsListOutputDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get('posts')
  async getPosts(): Promise<BlogPostsListOutputDTO> {
    const serviceRes = await this.blogService.getPosts();
    const res: BlogPostsListOutputDTO = {
      posts: serviceRes,
    };
    return res;
  }

  @ApiBody({
    type: BlogPostInputDTO,
    description: 'Create a new blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog post created successfully',
    type: BlogPostOutputDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Not authorized to create a blog post',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Permission('create:blog-post')
  @Post('posts')
  async createPost(
    @Body() blogPostInputDTO: BlogPostInputDTO,
    @GetUserId() userId: string,
  ): Promise<BlogPostOutputDTO> {
    const { title, description } = blogPostInputDTO;
    const inputPost: IPostCreate = {
      title,
      description,
    };
    return this.blogService.createPost(inputPost, userId);
  }

  @ApiParam({
    name: 'id',
    description: 'ID of the blog post to like',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog post liked successfully',
    type: BlogPostOutputDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Blog post not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Patch('posts/:id/like')
  async likePost(@Param('id') blogPostId: string): Promise<BlogPostOutputDTO> {
    //TODO: Validate in decorator
    if (!isUUID(blogPostId)) {
      throw new BadRequestException('Invalid blog post ID');
    }
    try {
      const post = await this.blogService.likePost(blogPostId);
      const blogPostOut: BlogPostOutputDTO = {
        id: post.id,
        title: post.title,
        description: post.description,
        createdBy: post.createdBy,
        likes: post.likes,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
      return blogPostOut;
    } catch (error: any) {
      if (error.name === 'BlogPostNotFoundError') {
        throw new NotFoundException('Post not found');
      }
      throw new InternalServerErrorException(
        'An error occurred while liking the post',
      );
    }
  }
}
