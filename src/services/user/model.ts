import { Document } from 'mongoose';
import Department from '../department/model';

export interface UserModel extends Document {
  username: string;
  password: string;
  role: Role;
  department: Department;
}

export enum Role {
  EVALUATOR = 'EVALUATOR',
  HR = 'HR',
}
