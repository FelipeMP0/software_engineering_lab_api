import { BaseRouter } from '../common/baseRouter.router';
import { Application } from 'express';
import { DepartmentController } from './controller';

export class DepartmentRouter implements BaseRouter {
  private app: Application;
  private departmentController: DepartmentController;

  constructor(app: Application) {
    this.app = app;
    this.departmentController = new DepartmentController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.get('/departments', this.departmentController.findAll);
  }
}
