import mongoosh, { Schema } from 'mongoose';
import { UserModel, Role } from './model';
import Department from '../department/model';

const schema: Schema = new Schema(
  {
    id: Object,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: [Role.EVALUATOR, Role.HR] },
    department: {
      type: String,
      required: true,
      enum: [Department.HR, Department.SOFTWARE_DEVELOPMENT, Department.SALES],
    },
  },
  { timestamps: true },
);

export const userSchema = mongoosh.model<UserModel>('USER', schema);
