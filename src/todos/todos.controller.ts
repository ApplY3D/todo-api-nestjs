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
import { TodoModel } from './todos.model';
import { TodosService } from './todos.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  async get(): Promise<TodoModel[]> {
    return this.todoService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateTodoDto) {
    const todo = await this.todoService.create(dto);
    if (!todo) {
      throw new HttpException(CREATION_FAILED, HttpStatus.BAD_GATEWAY);
    }
    return todo;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateById(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ModifyTodoDto,
  ) {
    const todo = await this.todoService.updateById(id, dto);
    if (!todo) {
      throw new HttpException(TODO_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  @Delete(':id')
  async deleteById(@Param('id', IdValidationPipe) id: string) {
    const todo = await this.todoService.deleteById(id);
    if (!todo) {
      throw new HttpException(TODO_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
