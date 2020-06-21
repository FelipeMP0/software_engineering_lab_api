import { Request, Response } from 'express';
import { UserService } from './service';
import { serverError } from '../../utils/errorHandler';

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
}
