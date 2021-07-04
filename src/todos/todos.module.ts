import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { TodosController } from './todos.controller';
import { TodoModel } from './todos.model';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TodoModel,
        schemaOptions: {
          collection: 'Todo',
        },
      },
    ]),
  ],
  providers: [TodosService],
})
export class TodosModule {}
