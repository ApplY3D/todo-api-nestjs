import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ModifyTodoDto } from './dto/modify-todo.dto';
import { TodoModel } from './todos.model';

@Injectable()
export class TodosService {
  async getAll(): Promise<TodoModel[]> {
    return [];
  }

  async create(dto: CreateTodoDto): Promise<TodoModel> {
    return null;
  }

  async modify(id: string, dto: ModifyTodoDto): Promise<TodoModel> {
    return null;
  }

  async delete(id: string): Promise<TodoModel> {
    return null;
  }
}
