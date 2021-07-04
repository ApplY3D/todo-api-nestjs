import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface TodoModel extends Base {}
export class TodoModel extends TimeStamps {
  @prop({ text: true })
  text: string;

  @prop()
  createdAt: Date;

  @prop()
  checked: boolean;
}
