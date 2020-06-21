import { Request, Response } from 'express';
import { DepartmentService } from './service';
import { serverError } from '../../utils/errorHandler';

export class DepartmentController {
  private departmentService: DepartmentService;

  constructor() {
    this.departmentService = new DepartmentService();
  }

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = this.departmentService.findAll();
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };
}
