import mongoosh, { Schema } from 'mongoose';
import { TestModel } from './model';

const schema: Schema = new Schema(
  {
    id: Object,
    name: String,
  },
  { timestamps: true },
);

export const testSchema = mongoosh.model<TestModel>('TEST', schema);
