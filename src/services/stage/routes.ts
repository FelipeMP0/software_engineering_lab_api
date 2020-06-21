import { BaseRouter } from '../common/baseRouter.router';
import { Application } from 'express';
import { StageController } from './controller';

export class StageRouter implements BaseRouter {
  private app: Application;
  private stageController: StageController;

  constructor(app: Application) {
    this.app = app;
    this.stageController = new StageController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.put('/stages/:id', this.stageController.update);
    this.app.delete('/stages/:id', this.stageController.delete);
  }
}
