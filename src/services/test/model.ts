import { Document } from 'mongoose';

export interface TestModel extends Document {
  name: string;
}
