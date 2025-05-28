import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class BlogPostInputDTO {
  @ApiProperty({
    description: 'Title of the blog post',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Content of the blog post',
    minLength: 3,
    maxLength: 5000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(5000)
  content: string;
}
