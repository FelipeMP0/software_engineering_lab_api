import { Role } from './model';
import Department from '../department/model';

export interface UserPresenter {
  _id: string;
  username: string;
  role: Role;
  department: Department;
}
