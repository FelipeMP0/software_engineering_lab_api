import { Role, UserModel } from './model';
import Department from '../department/model';

export interface UserPresenter {
  _id: string;
  username: string;
  role: Role;
  department: Department;
}

export const toUserPresenter = (model: UserModel): UserPresenter => {
  return {
    _id: model._id,
    username: model.username,
    role: model.role,
    department: model.department,
  };
};
