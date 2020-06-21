import { BaseRouter } from '../common/baseRouter.router';
import { Application } from 'express';
import { SkillController } from './controller';

export class SkillRouter implements BaseRouter {
  private app: Application;
  private skillController: SkillController;

  constructor(app: Application) {
    this.app = app;
    this.skillController = new SkillController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.post('/skills', this.skillController.create);
    this.app.put('/skills/:id', this.skillController.update);
    this.app.get('/skills', this.skillController.findAll);
    this.app.get('/skills/:id', this.skillController.findById);
    this.app.delete('/skills/:id', this.skillController.deleteById);
  }
}
