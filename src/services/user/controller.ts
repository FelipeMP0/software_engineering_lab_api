import { Request, Response } from 'express';
import { UserService } from './service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  save = async (req: Request, res: Response): Promise<void> => {
    const result = await this.userService.save(req.body);
    res.status(201).json(result);
  };
}
