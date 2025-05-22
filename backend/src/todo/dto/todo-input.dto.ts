/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ETodos } from '../interfaces/todo.interface';
import { ApiProperty } from '@nestjs/swagger';

export class TodoItemInputDto {
  @ApiProperty({
    description: 'Name of the todo item',
    example: 'Buy groceries',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Type of the todo item',
    enum: ETodos,
    example: ETodos.EMPTY_DISHWASHER,
  })
  @IsEnum(() => ETodos)
  type: ETodos;
}

export class TodoInputDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  name: string;
}
