import { Request, Response } from 'express';
import { UserService } from './service';
import { serverError } from '../../utils/errorHandler';
import { UserPresenter, toUserPresenter } from './presenter';

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
        return toUserPresenter(item);
      });
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  findByToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.findByToken(req.headers['authorization']!);
      if (user != null) {
        res.status(200).json(toUserPresenter(user));
      } else {
        res.status(404).send();
      }
    } catch (e) {
      serverError(e, res);
    }
  };
}
