import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  done: boolean;

  @Prop()
  createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
