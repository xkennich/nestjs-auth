import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserQuery {
  query = '_id login firstName lastName phone email',
}

@Schema()
export class User {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password?: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
