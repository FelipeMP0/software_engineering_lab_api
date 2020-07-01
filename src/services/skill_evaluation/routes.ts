import { BaseRouter } from '../common/baseRouter.router';
import { Application } from 'express';
import { SkillEvaluationController } from './controller';

export class SkillEvaluationRouter implements BaseRouter {
  private app: Application;
  private skillEvaluationController: SkillEvaluationController;

  constructor(app: Application) {
    this.app = app;
    this.skillEvaluationController = new SkillEvaluationController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.post('/evaluations', this.skillEvaluationController.create);
  }
}
