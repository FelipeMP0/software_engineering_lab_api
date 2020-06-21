import { Request, Response } from 'express';
import { UserService } from './service';
import { serverError } from '../../utils/errorHandler';
import { UserPresenter } from './presenter';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  save = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.userService.save(req.body);
      res.status(201).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  findAllEvaluators = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.findAllEvaluators();
      const result: UserPresenter[] = users.map(function (item, index) {
        return {
          _id: item._id,
          username: item.username,
          role: item.role,
          department: item.department,
        };
      });
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };
}
