import { Injectable } from '@nestjs/common';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

import { CreateTodoDto } from './dto/create-todo.dto';
import { ModifyTodoDto } from './dto/modify-todo.dto';
import { TodoModel } from './todos.model';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(TodoModel)
    private readonly todoModel: ReturnModelType<typeof TodoModel>,
  ) {}

  async getAll(): Promise<DocumentType<TodoModel[]>> {
    return this.todoModel.find();
  }

  async create(dto: CreateTodoDto): Promise<DocumentType<TodoModel>> {
    return this.todoModel.create({ ...dto, checked: false });
  }

  async updateById(
    id: string,
    dto: ModifyTodoDto,
  ): Promise<DocumentType<TodoModel>> {
    return this.todoModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteById(id: string): Promise<DocumentType<TodoModel>> {
    return this.todoModel.findByIdAndRemove(id).exec();
  }
}
