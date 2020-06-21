import Department from './model';

export class DepartmentService {
  findAll(): string[] {
    return Object.keys(Department);
  }
}
