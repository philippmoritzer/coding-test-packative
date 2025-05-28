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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  BlogPostOutputDTO,
  BlogPostsListOutputDTO,
} from '../dto/blog-post-output.dto';
import { BlogService } from '../service/blog.service';
import { BlogPostInputDTO } from '../dto/blog-post-input.dto';
import { IPostCreate } from '../interface/post.interface';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'page',
    description: 'Page number for pagination',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    description: 'Number of posts per page',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'order',
    description: 'Order of posts by creation date',
    required: false,
    type: String,
    example: 'DESC',
  })
  @Get('posts')
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('order', new DefaultValuePipe('DESC')) order: string,
  ): Promise<BlogPostsListOutputDTO> {
    //TODO: Validate in decorator
    if (page < 1) {
      throw new BadRequestException('Page must be >= 1');
    }
    if (pageSize < 1 || pageSize > 100) {
      throw new BadRequestException('pageSize must be between 1 and 100');
    }

    const normalizedOrder = order.toUpperCase();
    if (normalizedOrder !== 'ASC' && normalizedOrder !== 'DESC') {
      throw new BadRequestException("Order must be 'ASC' or 'DESC'");
    }
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const filter = { skip, take, order: normalizedOrder };
    const serviceRes = await this.blogService.getPosts(filter);
    const res: BlogPostsListOutputDTO = {
      posts: serviceRes.posts,
      total: serviceRes.total,
    };
    return res;
  }

  @Get('posts/:id')
  @ApiParam({
    name: 'id',
    description: 'ID of the blog post to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Blog post retrieved successfully',
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
  async getPostById(
    @Param('id') blogPostId: string,
  ): Promise<BlogPostOutputDTO> {
    if (!isUUID(blogPostId)) {
      throw new BadRequestException('Invalid blog post ID');
    }
    try {
      return await this.blogService.getPostByid(blogPostId);
    } catch (error: any) {
      if (error.name === 'BlogPostNotFoundError') {
        throw new NotFoundException('Post not found');
      }
      throw new InternalServerErrorException(
        'An error occurred while retrieving the post',
      );
    }
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
    const { title, content: description } = blogPostInputDTO;
    const inputPost: IPostCreate = {
      title,
      content: description,
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
        content: post.content,
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
