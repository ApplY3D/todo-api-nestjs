import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTodoDto } from './dto/create-todo.dto';
import { ModifyTodoDto } from './dto/modify-todo.dto';
import { TODO_NOT_FOUND, CREATION_FAILED } from './todos.constants';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  async get() {
    return this.todoService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateTodoDto) {
    const todo = await this.todoService.create(dto);
    if (!todo) {
      throw new HttpException(CREATION_FAILED, HttpStatus.BAD_GATEWAY);
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async modify(@Param('id') id: string, @Body() dto: ModifyTodoDto) {
    const todo = await this.todoService.modify(id, dto);
    if (!todo) {
      throw new HttpException(TODO_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const todo = await this.todoService.delete(id);
    if (!todo) {
      throw new HttpException(TODO_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
