import { BaseRouter } from '../common/baseRouter.router';
import { TestController } from './controller';
import { Application } from 'express';

export class TestRouter implements BaseRouter {
  private app: Application;
  private testController: TestController;

  constructor(app: Application) {
    this.app = app;
    this.testController = new TestController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.get('/', this.testController.findAll);
    this.app.post('/', this.testController.save);
  }
}
