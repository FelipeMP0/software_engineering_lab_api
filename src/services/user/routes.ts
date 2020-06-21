import { BaseRouter } from '../common/baseRouter.router';
import { UserController } from './controller';
import { Application } from 'express';

export class UserRouter implements BaseRouter {
  private app: Application;
  private userController: UserController;

  constructor(app: Application) {
    this.app = app;
    this.userController = new UserController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.post('/users', this.userController.save);
    this.app.get('/users/evaluators', this.userController.findAllEvaluators);
  }
}
